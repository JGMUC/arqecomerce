--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-04-23 17:55:33

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
-- TOC entry 218 (class 1259 OID 24579)
-- Name: comentarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comentarios (
    com_id integer NOT NULL,
    com_prd_id integer NOT NULL,
    com_comentario character(2000) NOT NULL,
    com_fecha date NOT NULL
);


ALTER TABLE public.comentarios OWNER TO postgres;

--
-- TOC entry 3348 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE comentarios; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.comentarios IS 'Tabla para guardar comentarios';


--
-- TOC entry 219 (class 1259 OID 24591)
-- Name: comentarios_com_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comentarios_com_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 1000000000
    CACHE 1;


ALTER TABLE public.comentarios_com_id_seq OWNER TO postgres;

--
-- TOC entry 3349 (class 0 OID 0)
-- Dependencies: 219
-- Name: comentarios_com_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comentarios_com_id_seq OWNED BY public.comentarios.com_id;


--
-- TOC entry 215 (class 1259 OID 16400)
-- Name: marcas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marcas (
    mar_id integer NOT NULL,
    mar_nombre character varying(120) NOT NULL
);


ALTER TABLE public.marcas OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16399)
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
-- TOC entry 3350 (class 0 OID 0)
-- Dependencies: 214
-- Name: marcas_mar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.marcas_mar_id_seq OWNED BY public.marcas.mar_id;


--
-- TOC entry 217 (class 1259 OID 16407)
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
    prd_ean bigint,
    mar_nombre bigint,
    imagenes character varying(255)
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16406)
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
-- TOC entry 3351 (class 0 OID 0)
-- Dependencies: 216
-- Name: productos_prd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_prd_id_seq OWNED BY public.productos.prd_id;


--
-- TOC entry 3185 (class 2604 OID 24594)
-- Name: comentarios com_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios ALTER COLUMN com_id SET DEFAULT nextval('public.comentarios_com_id_seq'::regclass);


--
-- TOC entry 3183 (class 2604 OID 16403)
-- Name: marcas mar_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marcas ALTER COLUMN mar_id SET DEFAULT nextval('public.marcas_mar_id_seq'::regclass);


--
-- TOC entry 3184 (class 2604 OID 16410)
-- Name: productos prd_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN prd_id SET DEFAULT nextval('public.productos_prd_id_seq'::regclass);


--
-- TOC entry 3341 (class 0 OID 24579)
-- Dependencies: 218
-- Data for Name: comentarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comentarios (com_id, com_prd_id, com_comentario, com_fecha) FROM stdin;
1	2	Es un producto muy feo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          	2023-04-22
\.


--
-- TOC entry 3338 (class 0 OID 16400)
-- Dependencies: 215
-- Data for Name: marcas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marcas (mar_id, mar_nombre) FROM stdin;
1	Colombia Arte
2	IndiArte
\.


--
-- TOC entry 3340 (class 0 OID 16407)
-- Dependencies: 217
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (prd_id, prd_nombre, prd_descripcion, prd_mar_id, prd_imagen, prd_cantidad, prd_valor_unitario, prd_ean, mar_nombre, imagenes) FROM stdin;
1	Jarron	Jarron oriental ansestral	1	/imagenes/jarron.png	1	1567890	1234568765432	\N	\N
2	Sombrero aguadeño	Sombrero aguadeño prehistórico	1	/imagenes/somagua.png	1	1562342	435668765432	\N	\N
4	Prueba nuevo producto	Sombrero aguadeño prehistórico	1	/imagenes/somagua.png	1	1562342	\N	\N	\N
5	Prueba nuevo producto	Sombrero aguadeño prehistórico	1	/imagenes/somagua.png	1	1562342	\N	\N	\N
6	Prueba Producto Nuevo	Sombrero 	1	/imagenes/smagua.png	1	1500002	\N	\N	\N
7	Prueba Producto Nuevo	Sombrero 	1	/imagenes/smagua.png	1	1500002	\N	\N	\N
\.


--
-- TOC entry 3352 (class 0 OID 0)
-- Dependencies: 219
-- Name: comentarios_com_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comentarios_com_id_seq', 1, true);


--
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 214
-- Name: marcas_mar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marcas_mar_id_seq', 2, true);


--
-- TOC entry 3354 (class 0 OID 0)
-- Dependencies: 216
-- Name: productos_prd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_prd_id_seq', 7, true);


--
-- TOC entry 3187 (class 2606 OID 16405)
-- Name: marcas marcas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marcas
    ADD CONSTRAINT marcas_pkey PRIMARY KEY (mar_id);


--
-- TOC entry 3192 (class 2606 OID 24585)
-- Name: comentarios pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT pk PRIMARY KEY (com_id);


--
-- TOC entry 3190 (class 2606 OID 16414)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (prd_id);


--
-- TOC entry 3188 (class 1259 OID 16420)
-- Name: fki_mar_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_mar_fk ON public.productos USING btree (prd_mar_id);


--
-- TOC entry 3193 (class 2606 OID 16415)
-- Name: productos mar_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT mar_fk FOREIGN KEY (prd_mar_id) REFERENCES public.marcas(mar_id);


--
-- TOC entry 3355 (class 0 OID 0)
-- Dependencies: 3193
-- Name: CONSTRAINT mar_fk ON productos; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON CONSTRAINT mar_fk ON public.productos IS 'Relación con marcas';


--
-- TOC entry 3194 (class 2606 OID 24586)
-- Name: comentarios prd_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT prd_fk FOREIGN KEY (com_prd_id) REFERENCES public.productos(prd_id);


-- Completed on 2023-04-23 17:55:33

--
-- PostgreSQL database dump complete
--

