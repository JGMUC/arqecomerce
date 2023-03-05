--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: marcas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marcas (
    mar_id integer NOT NULL,
    mar_nombre character varying(120) NOT NULL
);


ALTER TABLE public.marcas OWNER TO postgres;

--
-- Name: marcas_mar_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.marcas_mar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.marcas_mar_id_seq OWNER TO postgres;

--
-- Name: marcas_mar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.marcas_mar_id_seq OWNED BY public.marcas.mar_id;


--
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    prd_id integer NOT NULL,
    prd_nombre character varying(120) NOT NULL,
    prd_descripcion character varying(2000),
    prd_mar_id integer NOT NULL,
    prd_imagen character varying(400) NOT NULL,
    prd_cantidad double precision NOT NULL,
    prd_valor_unitario double precision NOT NULL,
    prd_ean bigint
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- Name: productos_prd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_prd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_prd_id_seq OWNER TO postgres;

--
-- Name: productos_prd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_prd_id_seq OWNED BY public.productos.prd_id;


--
-- Name: marcas mar_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marcas ALTER COLUMN mar_id SET DEFAULT nextval('public.marcas_mar_id_seq'::regclass);


--
-- Name: productos prd_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN prd_id SET DEFAULT nextval('public.productos_prd_id_seq'::regclass);


--
-- Data for Name: marcas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marcas (mar_id, mar_nombre) FROM stdin;
1	Colombia Arte
\.


--
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (prd_id, prd_nombre, prd_descripcion, prd_mar_id, prd_imagen, prd_cantidad, prd_valor_unitario, prd_ean) FROM stdin;
1	Jarron	Jarron oriental ansestral	1	/imagenes/jarron.png	1	1567890	1234568765432
2	Sombrero aguadeño	Sombrero aguadeño prehistórico	1	/imagenes/somagua.png	1	1562342	435668765432
\.


--
-- Name: marcas_mar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marcas_mar_id_seq', 1, false);


--
-- Name: productos_prd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_prd_id_seq', 3, true);


--
-- Name: marcas marcas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marcas
    ADD CONSTRAINT marcas_pkey PRIMARY KEY (mar_id);


--
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (prd_id);


--
-- Name: fki_mar_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_mar_fk ON public.productos USING btree (prd_mar_id);


--
-- Name: productos mar_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT mar_fk FOREIGN KEY (prd_mar_id) REFERENCES public.marcas(mar_id);


--
-- Name: CONSTRAINT mar_fk ON productos; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON CONSTRAINT mar_fk ON public.productos IS 'Relación con marcas';


--
-- PostgreSQL database dump complete
--

