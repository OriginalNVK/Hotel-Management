-- PostgreSQL equivalents for SQL Server functions/procedures
-- Apply to Neon with:
-- npx prisma db execute --file=prisma/procedures.sql --schema=prisma/schema.prisma

CREATE OR REPLACE FUNCTION count_number_of_customer(p_booking_id INT)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
  v_number_customer INT;
BEGIN
  SELECT COUNT(DISTINCT bc."customerId")
  INTO v_number_customer
  FROM bookingcustomers bc
  WHERE bc."bookingId" = p_booking_id;

  RETURN COALESCE(v_number_customer, 0);
END;
$$;

CREATE OR REPLACE FUNCTION get_max_coefficient(p_booking_id INT)
RETURNS DOUBLE PRECISION
LANGUAGE plpgsql
AS $$
DECLARE
  v_max_coefficient DOUBLE PRECISION;
BEGIN
  SELECT MAX(ct.coefficient)
  INTO v_max_coefficient
  FROM bookingcustomers bc
  JOIN customer c ON c."customerId" = bc."customerId"
  JOIN customertype ct ON ct.type = c.type
  WHERE bc."bookingId" = p_booking_id;

  RETURN COALESCE(v_max_coefficient, 1.0);
END;
$$;

CREATE OR REPLACE FUNCTION calc_cost_of_booking(p_booking_id INT)
RETURNS DOUBLE PRECISION
LANGUAGE plpgsql
AS $$
DECLARE
  v_number_customer INT;
  v_max_coefficient DOUBLE PRECISION;
  v_nights INT;
  v_min_customer_for_surcharge INT;
  v_price INT;
  v_surcharge DOUBLE PRECISION;
  v_cost DOUBLE PRECISION;
  v_extra_customer INT;
BEGIN
  v_number_customer := count_number_of_customer(p_booking_id);
  v_max_coefficient := get_max_coefficient(p_booking_id);

  SELECT GREATEST((CURRENT_DATE - b."bookingDate"::date), 1)
  INTO v_nights
  FROM booking b
  WHERE b."bookingId" = p_booking_id;

  SELECT
    rt."minCustomerForSurcharge",
    rt.price,
    rt."surchargeRate"
  INTO
    v_min_customer_for_surcharge,
    v_price,
    v_surcharge
  FROM booking b
  JOIN room r ON r."roomId" = b."roomId"
  JOIN roomtype rt ON rt.type = r.type
  WHERE b."bookingId" = p_booking_id;

  v_cost := COALESCE(v_price, 0) * COALESCE(v_nights, 1) * COALESCE(v_max_coefficient, 1);

  v_extra_customer := COALESCE(v_number_customer, 0) - COALESCE(v_min_customer_for_surcharge, 0);
  IF v_extra_customer > 0 THEN
    v_cost := v_cost * (1 + COALESCE(v_surcharge, 0) * v_extra_customer);
  END IF;

  RETURN COALESCE(v_cost, 0);
END;
$$;

CREATE OR REPLACE FUNCTION update_revenue_report(p_invoice_id INT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  v_invoice_date DATE;
  v_amount DOUBLE PRECISION;
  v_month INT;
  v_year INT;
BEGIN
  SELECT i."invoiceDate"::date, i.amount
  INTO v_invoice_date, v_amount
  FROM invoice i
  WHERE i."invoiceId" = p_invoice_id;

  IF v_invoice_date IS NULL THEN
    RETURN;
  END IF;

  v_month := EXTRACT(MONTH FROM v_invoice_date)::INT;
  v_year := EXTRACT(YEAR FROM v_invoice_date)::INT;

  INSERT INTO revenuereport ("month", "year", "totalRevenue")
  VALUES (v_month, v_year, COALESCE(v_amount, 0))
  ON CONFLICT ("month", "year")
  DO UPDATE SET "totalRevenue" = revenuereport."totalRevenue" + EXCLUDED."totalRevenue";
END;
$$;

CREATE OR REPLACE FUNCTION update_revenue_report_has_roomtype(p_invoice_id INT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  v_invoice_date DATE;
  v_month INT;
  v_year INT;
BEGIN
  SELECT i."invoiceDate"::date
  INTO v_invoice_date
  FROM invoice i
  WHERE i."invoiceId" = p_invoice_id;

  IF v_invoice_date IS NULL THEN
    RETURN;
  END IF;

  v_month := EXTRACT(MONTH FROM v_invoice_date)::INT;
  v_year := EXTRACT(YEAR FROM v_invoice_date)::INT;

  INSERT INTO revenuereport_has_roomtype ("month", "year", "type", "revenue")
  SELECT
    v_month,
    v_year,
    r.type,
    COALESCE(SUM(b.cost), 0)
  FROM booking b
  JOIN room r ON r."roomId" = b."roomId"
  WHERE b."invoiceId" = p_invoice_id
  GROUP BY r.type
  ON CONFLICT ("month", "year", "type")
  DO UPDATE SET "revenue" = revenuereport_has_roomtype."revenue" + EXCLUDED."revenue";
END;
$$;

CREATE OR REPLACE FUNCTION update_occupancy(p_invoice_id INT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  v_invoice_date DATE;
  v_month INT;
  v_year INT;
  v_rental_days DOUBLE PRECISION;
BEGIN
  SELECT i."invoiceDate"::date
  INTO v_invoice_date
  FROM invoice i
  WHERE i."invoiceId" = p_invoice_id;

  IF v_invoice_date IS NULL THEN
    RETURN;
  END IF;

  v_month := EXTRACT(MONTH FROM v_invoice_date)::INT;
  v_year := EXTRACT(YEAR FROM v_invoice_date)::INT;

  SELECT COALESCE(SUM(GREATEST((v_invoice_date - b."bookingDate"::date), 1)), 0)
  INTO v_rental_days
  FROM booking b
  WHERE b."invoiceId" = p_invoice_id;

  INSERT INTO occupancy ("month", "year", "totalRentalDay")
  VALUES (v_month, v_year, COALESCE(v_rental_days, 0))
  ON CONFLICT ("month", "year")
  DO UPDATE SET "totalRentalDay" = occupancy."totalRentalDay" + EXCLUDED."totalRentalDay";
END;
$$;

CREATE OR REPLACE FUNCTION update_occupancy_has_room(p_invoice_id INT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  v_invoice_date DATE;
  v_month INT;
  v_year INT;
BEGIN
  SELECT i."invoiceDate"::date
  INTO v_invoice_date
  FROM invoice i
  WHERE i."invoiceId" = p_invoice_id;

  IF v_invoice_date IS NULL THEN
    RETURN;
  END IF;

  v_month := EXTRACT(MONTH FROM v_invoice_date)::INT;
  v_year := EXTRACT(YEAR FROM v_invoice_date)::INT;

  INSERT INTO occupancy_has_room ("month", "year", "roomId", "rentalDays")
  SELECT
    v_month,
    v_year,
    b."roomId",
    SUM(GREATEST((v_invoice_date - b."bookingDate"::date), 1))::DOUBLE PRECISION
  FROM booking b
  WHERE b."invoiceId" = p_invoice_id
  GROUP BY b."roomId"
  ON CONFLICT ("month", "year", "roomId")
  DO UPDATE SET "rentalDays" = occupancy_has_room."rentalDays" + EXCLUDED."rentalDays";
END;
$$;

CREATE OR REPLACE FUNCTION update_all_reports(p_invoice_id INT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM update_revenue_report(p_invoice_id);
  PERFORM update_revenue_report_has_roomtype(p_invoice_id);
  PERFORM update_occupancy(p_invoice_id);
  PERFORM update_occupancy_has_room(p_invoice_id);
END;
$$;
