--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.6 (Homebrew)

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
-- Name: appointment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointment (
    id text NOT NULL,
    user_id text NOT NULL,
    service_id text NOT NULL,
    business_id text NOT NULL,
    client_id text NOT NULL,
    start_date text NOT NULL,
    end_date text NOT NULL,
    service_cost integer NOT NULL,
    is_video boolean NOT NULL,
    is_paid boolean NOT NULL,
    service_duration integer NOT NULL
);


ALTER TABLE public.appointment OWNER TO postgres;

--
-- Name: availability_slice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.availability_slice (
    user_id text NOT NULL,
    business_id text NOT NULL,
    day integer NOT NULL,
    start_time text NOT NULL,
    end_time text NOT NULL
);


ALTER TABLE public.availability_slice OWNER TO postgres;

--
-- Name: business; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.business (
    id text NOT NULL,
    name text NOT NULL,
    email text,
    phone text,
    min_booking_notice text,
    max_book_ahead text,
    min_cancel_notice text,
    user_id text,
    avatar text,
    created text
);


ALTER TABLE public.business OWNER TO postgres;

--
-- Name: client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    address text,
    phone text,
    avatar text
);


ALTER TABLE public.client OWNER TO postgres;

--
-- Name: clients_businesses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients_businesses (
    client_id text NOT NULL,
    business_id text NOT NULL,
    notes text,
    name text,
    email text,
    address text,
    phone text,
    joined_date text NOT NULL,
    active boolean NOT NULL
);


ALTER TABLE public.clients_businesses OWNER TO postgres;

--
-- Name: clients_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients_users (
    user_id text NOT NULL,
    client_id text NOT NULL,
    business_id text NOT NULL
);


ALTER TABLE public.clients_users OWNER TO postgres;

--
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification (
    user_id text NOT NULL,
    notification text NOT NULL,
    link text,
    seen boolean NOT NULL,
    created text NOT NULL
);


ALTER TABLE public.notification OWNER TO postgres;

--
-- Name: service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service (
    id text NOT NULL,
    business_id text NOT NULL,
    name text NOT NULL,
    duration integer NOT NULL,
    provider text NOT NULL,
    cost integer NOT NULL,
    is_video boolean NOT NULL,
    color text NOT NULL,
    deleted boolean NOT NULL
);


ALTER TABLE public.service OWNER TO postgres;

--
-- Name: user_prefs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_prefs (
    user_id text NOT NULL,
    private_photo boolean NOT NULL,
    private_email boolean NOT NULL,
    private_phone boolean NOT NULL,
    notification_booking boolean NOT NULL,
    notification_reminder boolean NOT NULL,
    notification_overview boolean NOT NULL,
    notification_overview_time text NOT NULL
);


ALTER TABLE public.user_prefs OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    created text NOT NULL,
    avatar text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_businesses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_businesses (
    user_id text NOT NULL,
    business_id text NOT NULL,
    elevated boolean NOT NULL,
    date_added text NOT NULL
);


ALTER TABLE public.users_businesses OWNER TO postgres;

--
-- Name: users_services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_services (
    service_id text NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE public.users_services OWNER TO postgres;

--
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointment (id, user_id, service_id, business_id, client_id, start_date, end_date, service_cost, is_video, is_paid, service_duration) FROM stdin;
1341392d-2aad-c827-6c80-bfc5ab8620fa	christinabronson	fullconsult	johnsonteam	alexanderstewart	2023-04-29T13:00:00.000Z	2023-04-29T14:15:00.000Z	120	t	f	75
1bc3e1eb-bb71-5ffb-8203-99b1bc620ad1	christinabronson	fullconsult	johnsonteam	brittanycolt	2023-05-02T13:00:00.000Z	2023-05-02T14:15:00.000Z	120	t	f	75
a5e67a0c-9a01-a2dd-d1ba-ea9f21b777ac	christinabronson	fullconsult	johnsonteam	brittanycolt	2023-04-29T14:30:00.000Z	2023-04-29T15:45:00.000Z	120	t	f	75
1a9395f2-b31d-3a43-a534-cab1f07768a0	christinabronson	reviewmeeting	johnsonteam	brittanycolt	2023-05-04T13:00:00.000Z	2023-05-04T14:00:00.000Z	80	t	t	60
c62f44fa-d706-05a4-b8a4-b935d0a1bb50	christinabronson	initialconsult	christinabronsonbusiness	emiliegray	2023-05-02T14:15:00.000Z	2023-05-02T15:15:00.000Z	150	t	f	60
a9d8bdd4-9b24-c3eb-fc8a-6c2406985426	christinabronson	785ec060-298c-3f82-bc39-c8ff23377c1f	christinabronsonbusiness	emiliegray	2023-05-03T14:30:00.000Z	2023-05-03T16:00:00.000Z	155	t	f	90
314b2e25-38fd-0105-e9c6-092fbe706e6e	christinabronson	reviewmeeting	johnsonteam	alexanderstewart	2023-05-04T14:00:00.000Z	2023-05-04T15:00:00.000Z	80	t	f	60
452a2198-f316-7acf-c190-e30d69658377	christinabronson	e544ad9c-c821-cf2f-6c6a-d4d6273a5cf9	johnsonteam	alexanderstewart	2023-05-05T13:15:00.000Z	2023-05-05T14:15:00.000Z	0	t	f	60
de021216-871e-a57e-f640-f83e589e364a	christinabronson	reviewmeeting	johnsonteam	alexanderstewart	2023-05-12T13:00:00.000Z	2023-05-12T14:00:00.000Z	80	t	t	60
4b650736-cc38-996e-77e5-d0ed09b47530	christinabronson	f7da228b-ad1f-ce26-54ef-57af809a88ae	johnsonteam	alexanderstewart	2023-05-09T13:00:00.000Z	2023-05-09T15:00:00.000Z	120	t	t	120
30b6e3e2-42e0-0978-2a7e-becc2fb5c48e	christinabronson	initialconsult	christinabronsonbusiness	stevenprice	2023-05-10T18:45:00.000Z	2023-05-10T19:45:00.000Z	150	t	t	60
\.


--
-- Data for Name: availability_slice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.availability_slice (user_id, business_id, day, start_time, end_time) FROM stdin;
christinabronson	johnsonteam	5	9:00	14:00
philipwest	johnsonteam	4	1:00	7:00
philipwest	johnsonteam	0	9:00	14:00
philipwest	johnsonteam	1	9:00	14:00
philipwest	johnsonteam	2	9:00	14:00
christinabronson	christinabronsonbusiness	1	8:00	12:00
christinabronson	christinabronsonbusiness	1	13:00	17:00
christinabronson	christinabronsonbusiness	2	8:00	12:00
christinabronson	christinabronsonbusiness	2	13:00	17:00
christinabronson	christinabronsonbusiness	3	8:00	12:00
christinabronson	christinabronsonbusiness	3	13:00	17:00
christinabronson	johnsonteam	4	6:00	8:00
christinabronson	johnsonteam	4	9:00	14:00
christinabronson	christinabronsonbusiness	0	8:00	12:00
christinabronson	christinabronsonbusiness	0	13:00	17:00
christinabronson	johnsonteam	0	6:00	8:00
christinabronson	262005cf-d489-4fe2-ebe8-d29a59f2d1f4	6	8:00	10:00
christinabronson	262005cf-d489-4fe2-ebe8-d29a59f2d1f4	0	5:15	14:00
\.


--
-- Data for Name: business; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.business (id, name, email, phone, min_booking_notice, max_book_ahead, min_cancel_notice, user_id, avatar, created) FROM stdin;
johnsonteam	Johnson Team	johnsonteam@gmail.com	(905) 535-5353	172800000	2592000000	86400000	\N	\N	2023-02-05T14:18:35.883Z
262005cf-d489-4fe2-ebe8-d29a59f2d1f4	Chloe's Business	\N	\N	\N	\N	\N	\N	\N	2023-05-10T17:49:49.890Z
christinabronsonbusiness	Christina Bronson	\N	\N	172800000	1036800000	0	christinabronson	\N	2023-03-05T14:18:35.883Z
\.


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client (id, name, email, address, phone, avatar) FROM stdin;
samuelcooper	Samuel Cooper	samuel.cooper@gmail.com	1355 Plains Rd. East, Hamilton	905-923-3531	
alexanderstewart	Alexander Stewart	alexander.stewart@gmail.com	2412 Plains Rd. West, Hamilton	905-923-1242	https://media.licdn.com/dms/image/C4D03AQHk17MQXBeSAw/profile-displayphoto-shrink_800_800/0/1646826743327?e=2147483647&v=beta&t=EuIC-hw_Cy5YGDNQPWC66L_76IdAOB11woGCZs-7ujo
emiliegray	Emilie Gray	not.emilie.gray@gmail.com	1234 Hamilton St E	905-155-1525	https://nanny.org/wp-content/uploads/2021/11/profile-square.jpeg
brittanycolt	Brittany Colt	brittany.colt@gmail.com	1353 Plains Rd. East, Hamilton	905-923-3535	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgcO9-MkoFPEElGyKy2D089PhBPbF4pobt9Q&usqp=CAU
stevenprice	Steven Price	stevenprice@gmail.com	1234 Hamilton St W	905-242-3353	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgc0529voP8_rwuhDWNyVWyIlfzCNKbyZtHg&usqp=CAU
b5983b7b-1faa-3add-0514-b7f70d64cf37	Broski	broskibro@gmail.com	\N	\N	\N
d5443613-44f3-0229-b8e4-3df16e6c2bfb	Ryan Hartwig	ryan1431@gmail.com	\N	\N	\N
7660dbf0-ce36-c342-d4f1-3dfb07089c23	Test	test@test.tses	\N	\N	\N
72919306-ef0d-aef1-a7b4-c97d847b64a2	John	John@gmail.com	\N	\N	\N
\.


--
-- Data for Name: clients_businesses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients_businesses (client_id, business_id, notes, name, email, address, phone, joined_date, active) FROM stdin;
stevenprice	christinabronsonbusiness	\N	Steven Price	\N	Yes street	\N	2023-04-03T13:37:20.718Z	t
emiliegray	christinabronsonbusiness	Cannot do full length appointments. Modified rate to accomodate for this	\N	\N	\N	\N	2023-04-04T13:37:20.718Z	t
b5983b7b-1faa-3add-0514-b7f70d64cf37	christinabronsonbusiness	\N	Ryan Hartwig	ryan1431@gmail.com	16 Peebles Dr	9055360226	2023-05-05T12:36:01.768Z	t
alexanderstewart	johnsonteam	\N	\N	\N	\N	\N	2023-04-08T13:37:20.718Z	t
d5443613-44f3-0229-b8e4-3df16e6c2bfb	johnsonteam	\N	\N	\N	\N	\N	2023-05-06T13:43:44.532Z	t
72919306-ef0d-aef1-a7b4-c97d847b64a2	262005cf-d489-4fe2-ebe8-d29a59f2d1f4	\N	John	John@gmail.com	\N	\N	2023-05-10T17:51:50.857Z	t
samuelcooper	johnsonteam	\N	\N	\N	\N	\N	2023-04-10T13:37:20.718Z	t
brittanycolt	johnsonteam	\N	\N	\N	\N	\N	2023-04-12T13:37:20.718Z	t
\.


--
-- Data for Name: clients_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients_users (user_id, client_id, business_id) FROM stdin;
christinabronson	emiliegray	christinabronsonbusiness
christinabronson	stevenprice	christinabronsonbusiness
christinabronson	alexanderstewart	johnsonteam
christinabronson	samuelcooper	johnsonteam
marlyjohnson	brittanycolt	johnsonteam
philipwest	alexanderstewart	johnsonteam
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification (user_id, notification, link, seen, created) FROM stdin;
christinabronson	Welcome to BookEasy! If this is your first time, click here to get set up.	/business	f	2023-04-20T12:59:16.164Z
\.


--
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.service (id, business_id, name, duration, provider, cost, is_video, color, deleted) FROM stdin;
1e9f2167-b9ac-71bc-8a76-61b69409761e	johnsonteam	Steve	60	Johnson Team	120	t	#0643ea	t
f7da228b-ad1f-ce26-54ef-57af809a88ae	johnsonteam	Beef	120	Johnson Team	120	t	#061fea	t
e544ad9c-c821-cf2f-6c6a-d4d6273a5cf9	johnsonteam	Garbage	60	Johnson Team	0	t	#ea0690	t
initialconsult	christinabronsonbusiness	Initial Consult	60	Christina Bronson	150	t	#ea065e	f
fullconsult	johnsonteam	Full Consult	60	Johnson Team	120	t	#06eab7	f
785ec060-298c-3f82-bc39-c8ff23377c1f	christinabronsonbusiness	Full Consult	90	Christina Bronson	155	t	#06ccea	f
reviewmeeting	johnsonteam	Review Meeting	60	Johnson Team	80	t	#ea0680	f
696d46ee-4ea2-0a7d-59b0-387b25dc3416	262005cf-d489-4fe2-ebe8-d29a59f2d1f4	String Cheese	30	Chloe's Business	0	f	#e1ea06	f
5603aebb-2528-adca-23df-92e28146b0b4	christinabronsonbusiness	Another one	60	Christina Bronson	150	t	#12ea06	f
\.


--
-- Data for Name: user_prefs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_prefs (user_id, private_photo, private_email, private_phone, notification_booking, notification_reminder, notification_overview, notification_overview_time) FROM stdin;
philipwest	f	f	f	t	t	f	9:00
marlyjohnson	f	f	f	t	t	f	9:00
christinabronson	t	t	t	t	t	t	5:00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, phone, created, avatar) FROM stdin;
marlyjohnson	Marly Johnson	marly.johnson@gmail.com	935-353-2424	2023-04-08T13:35:36.487Z	https://sm.ign.com/t/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.300.jpg
philipwest	Philip West	philip.west@gmail.com	935-535-2525	2023-04-09T13:35:36.487Z	https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg
christinabronson	Christina Bronson	christinabronson@gmail.com	(905) 536-6262	2023-02-20T13:35:36.487Z	\N
\.


--
-- Data for Name: users_businesses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_businesses (user_id, business_id, elevated, date_added) FROM stdin;
philipwest	johnsonteam	f	2023-04-11T11:37:20.718Z
marlyjohnson	johnsonteam	t	2023-04-10T11:37:20.718Z
christinabronson	johnsonteam	t	2023-04-08T11:37:20.718Z
christinabronson	262005cf-d489-4fe2-ebe8-d29a59f2d1f4	t	2023-05-10T17:49:49.892Z
\.


--
-- Data for Name: users_services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_services (service_id, user_id) FROM stdin;
e544ad9c-c821-cf2f-6c6a-d4d6273a5cf9	christinabronson
e544ad9c-c821-cf2f-6c6a-d4d6273a5cf9	marlyjohnson
initialconsult	christinabronson
fullconsult	philipwest
785ec060-298c-3f82-bc39-c8ff23377c1f	christinabronson
reviewmeeting	philipwest
reviewmeeting	marlyjohnson
696d46ee-4ea2-0a7d-59b0-387b25dc3416	christinabronson
5603aebb-2528-adca-23df-92e28146b0b4	christinabronson
f7da228b-ad1f-ce26-54ef-57af809a88ae	philipwest
f7da228b-ad1f-ce26-54ef-57af809a88ae	marlyjohnson
f7da228b-ad1f-ce26-54ef-57af809a88ae	christinabronson
1e9f2167-b9ac-71bc-8a76-61b69409761e	christinabronson
1e9f2167-b9ac-71bc-8a76-61b69409761e	marlyjohnson
\.


--
-- Name: appointment appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_pkey PRIMARY KEY (id);


--
-- Name: business business_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_pkey PRIMARY KEY (id);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: service service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: appointment appointment_business_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.business(id) ON DELETE CASCADE;


--
-- Name: appointment appointment_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id) ON DELETE CASCADE;


--
-- Name: appointment appointment_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.service(id);


--
-- Name: appointment appointment_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: availability_slice availability_slice_business_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.availability_slice
    ADD CONSTRAINT availability_slice_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.business(id) ON DELETE CASCADE;


--
-- Name: availability_slice availability_slice_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.availability_slice
    ADD CONSTRAINT availability_slice_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: business business_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: clients_businesses clients_businesses_business_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_businesses
    ADD CONSTRAINT clients_businesses_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.business(id) ON DELETE CASCADE;


--
-- Name: clients_businesses clients_businesses_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_businesses
    ADD CONSTRAINT clients_businesses_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id) ON DELETE CASCADE;


--
-- Name: clients_users clients_users_business_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_users
    ADD CONSTRAINT clients_users_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.business(id) ON DELETE CASCADE;


--
-- Name: clients_users clients_users_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_users
    ADD CONSTRAINT clients_users_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id) ON DELETE CASCADE;


--
-- Name: clients_users clients_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_users
    ADD CONSTRAINT clients_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: notification notification_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: service service_business_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.business(id) ON DELETE CASCADE;


--
-- Name: user_prefs user_prefs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_prefs
    ADD CONSTRAINT user_prefs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users_businesses users_businesses_business_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_businesses
    ADD CONSTRAINT users_businesses_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.business(id) ON DELETE CASCADE;


--
-- Name: users_businesses users_businesses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_businesses
    ADD CONSTRAINT users_businesses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users_services users_services_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_services
    ADD CONSTRAINT users_services_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.service(id) ON DELETE CASCADE;


--
-- Name: users_services users_services_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_services
    ADD CONSTRAINT users_services_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

