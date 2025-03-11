PGDMP  /    )                }           online_library    16.4    16.4 )    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    72442    online_library    DATABASE     �   CREATE DATABASE online_library WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Nigeria.1252';
    DROP DATABASE online_library;
                postgres    false                        2615    99398    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            Z           1247    99439    CheckoutStatus    TYPE     b   CREATE TYPE public."CheckoutStatus" AS ENUM (
    'CHECKED_OUT',
    'RETURNED',
    'OVERDUE'
);
 #   DROP TYPE public."CheckoutStatus";
       public          postgres    false    5            Q           1247    99409    Role    TYPE     W   CREATE TYPE public."Role" AS ENUM (
    'LIBRARIAN',
    'READER',
    'SUPERADMIN'
);
    DROP TYPE public."Role";
       public          postgres    false    5            �            1259    99428    Book    TABLE     �  CREATE TABLE public."Book" (
    id integer NOT NULL,
    title text NOT NULL,
    isbn text NOT NULL,
    "coverPage" text,
    "revisionNumber" integer NOT NULL,
    "publishedDate" timestamp(3) without time zone NOT NULL,
    publisher text NOT NULL,
    authors text NOT NULL,
    genre text NOT NULL,
    "dateAdded" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "bookPhoto" text NOT NULL
);
    DROP TABLE public."Book";
       public         heap    postgres    false    5            �            1259    99427    Book_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Book_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Book_id_seq";
       public          postgres    false    5    219            �           0    0    Book_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Book_id_seq" OWNED BY public."Book".id;
          public          postgres    false    218            �            1259    99446    Checkout    TABLE     �  CREATE TABLE public."Checkout" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "bookId" integer NOT NULL,
    "checkoutDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "expectedCheckinDate" timestamp(3) without time zone NOT NULL,
    "checkinDate" timestamp(3) without time zone,
    status public."CheckoutStatus" DEFAULT 'CHECKED_OUT'::public."CheckoutStatus" NOT NULL
);
    DROP TABLE public."Checkout";
       public         heap    postgres    false    858    5    858            �            1259    99445    Checkout_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Checkout_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Checkout_id_seq";
       public          postgres    false    5    221            �           0    0    Checkout_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Checkout_id_seq" OWNED BY public."Checkout".id;
          public          postgres    false    220            �            1259    99414    User    TABLE     �  CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "profilePhoto" text,
    role public."Role" DEFAULT 'READER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    address text NOT NULL,
    bio text,
    "displayName" text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "phoneNumber" text NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false    849    5    849            �            1259    99413    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    217    5            �           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          postgres    false    216            �            1259    99399    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            #           2604    99431    Book id    DEFAULT     f   ALTER TABLE ONLY public."Book" ALTER COLUMN id SET DEFAULT nextval('public."Book_id_seq"'::regclass);
 8   ALTER TABLE public."Book" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            %           2604    99449    Checkout id    DEFAULT     n   ALTER TABLE ONLY public."Checkout" ALTER COLUMN id SET DEFAULT nextval('public."Checkout_id_seq"'::regclass);
 <   ALTER TABLE public."Checkout" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221                        2604    99417    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �          0    99428    Book 
   TABLE DATA           �   COPY public."Book" (id, title, isbn, "coverPage", "revisionNumber", "publishedDate", publisher, authors, genre, "dateAdded", "updatedAt", "bookPhoto") FROM stdin;
    public          postgres    false    219   �0       �          0    99446    Checkout 
   TABLE DATA           z   COPY public."Checkout" (id, "userId", "bookId", "checkoutDate", "expectedCheckinDate", "checkinDate", status) FROM stdin;
    public          postgres    false    221   R5       �          0    99414    User 
   TABLE DATA           �   COPY public."User" (id, email, password, "profilePhoto", role, "createdAt", "updatedAt", address, bio, "displayName", "firstName", "lastName", "phoneNumber") FROM stdin;
    public          postgres    false    217   �5       �          0    99399    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   �7       �           0    0    Book_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Book_id_seq"', 12, true);
          public          postgres    false    218            �           0    0    Checkout_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Checkout_id_seq"', 5, true);
          public          postgres    false    220            �           0    0    User_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."User_id_seq"', 54, true);
          public          postgres    false    216            1           2606    99436    Book Book_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Book"
    ADD CONSTRAINT "Book_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Book" DROP CONSTRAINT "Book_pkey";
       public            postgres    false    219            4           2606    99453    Checkout Checkout_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Checkout"
    ADD CONSTRAINT "Checkout_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Checkout" DROP CONSTRAINT "Checkout_pkey";
       public            postgres    false    221            -           2606    99423    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    217            )           2606    99407 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            .           1259    99456    Book_isbn_idx    INDEX     B   CREATE INDEX "Book_isbn_idx" ON public."Book" USING btree (isbn);
 #   DROP INDEX public."Book_isbn_idx";
       public            postgres    false    219            /           1259    99437    Book_isbn_key    INDEX     I   CREATE UNIQUE INDEX "Book_isbn_key" ON public."Book" USING btree (isbn);
 #   DROP INDEX public."Book_isbn_key";
       public            postgres    false    219            2           1259    99455    Checkout_bookId_idx    INDEX     P   CREATE INDEX "Checkout_bookId_idx" ON public."Checkout" USING btree ("bookId");
 )   DROP INDEX public."Checkout_bookId_idx";
       public            postgres    false    221            5           1259    99454    Checkout_userId_idx    INDEX     P   CREATE INDEX "Checkout_userId_idx" ON public."Checkout" USING btree ("userId");
 )   DROP INDEX public."Checkout_userId_idx";
       public            postgres    false    221            *           1259    99457    User_email_idx    INDEX     D   CREATE INDEX "User_email_idx" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_idx";
       public            postgres    false    217            +           1259    99424    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    217            6           2606    99463    Checkout Checkout_bookId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Checkout"
    ADD CONSTRAINT "Checkout_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES public."Book"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Checkout" DROP CONSTRAINT "Checkout_bookId_fkey";
       public          postgres    false    219    4657    221            7           2606    99458    Checkout Checkout_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Checkout"
    ADD CONSTRAINT "Checkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Checkout" DROP CONSTRAINT "Checkout_userId_fkey";
       public          postgres    false    4653    217    221            �   �  x���Ko�6��ʧ੽,��%N�`� N�(�Zf,�eR���Oߑ��ive��a����4{(=���(}�BD���}f�!�*��0&+��ng���o��+�i{^��|Ӟ{_"_��>�V�3�Q+)&S�����c�ʿC�Mz�����m�b��ϯr�pU�k�dס�B�#Lb�1���g�b&���Jn�~��LisW�.a���a���%���%�Xvׄ�/r��o�U(��TPj-�'����ώ#7˨�p1��9r?��7��R|����󥫪콋]�����>m]�?�753)s��}��J.%ט-�2R�O~Y�qȋ#��g��\�b��Ga1Q��[�b��}q�r׬����G��'�W}ۥ:����7'�r�>ͥ8��`��ĘI�=$�!Tr�S*6 �ehV#'Q�2B��'��w������dEF%�#���2GC]�X����Sv�����l�vPMD7�+C�͈ʙ~��}�_3Ŕpb��l�cߦ�2t#��2Ø>	[�>�ڵ�b1{Ez��EU��ħ�^�!U� �v�sm����8���=ڧ)eZ@�r.�����
(!5-���A�k��� �����\��<���dM���և� c6��C��>���&�B?oQLΨȕa��idK���7�"��H�AS�#J���?���Z��^�D���᧠��<����Go����Րkʎ�b��/bQ�f@�:�ʡ���{@����_��f��T����(XN��p��5�1&�����+���&�e'{�{�yAZ��T�_�y���֩qM?mf��� �b��f�2k)�Jpc�=��u�Ue���RZ���2�qHQ&	��ꓲ/g*Xg`8/�cP�x[�Z�8oS��t�u;���~&ꝓa*i�'��`�Tf�(3��O���n�:t�vُ�ׂ3ͥ:�����ף�K�ׂ�B����5�oѢh�2��W��b�]�:2v���}������Z���6�I�4�dvP;#RAÖ{�S�}����7�ƍlB�jlG��'�`��N7�i��>^�]�ݲ�+�g�{x�EX�\��'���f�󵇰�a۔��O���(�6
Ή�Pぇe�&l{�.�����-N��B<sP��'�j"�ߵ-,�o[�_��J�JЍ�_�����ʸJ����I��W��}�j���y.���}������,}      �   �   x���K
�@�u�^�!�:f�B���
���.GY�$_B2��Ӊ.�"(�����c��Z�[��}KZ��w^�y���LȮ= W�[����/�ݫ\��[��l���9��l���QƮ�L)=��C�      �   �  x�u�M��@��㯘���a9-�m)QX]wk/������G�lSɩ�����m��[��ę'Y,�F&���:��T���i[��*q�8zaS���;s��=����uNX�V�y�i�;b �]���n�:���CbX&�E���u��_�BE� O ��}���n)A?R�xU3�Y���̬�@��m���N��cp"�NF�&&�b3�gZ:qs�3tߴ����鈫��s�Z�Œos-Sr�b�B6H�b�M�66�ޠ��&�TG�, ������vPu�R�-�)$���20���n@�PB7^?-���_d`�-�=�R�*�rۣf���5�6�ҧj��'��D����=pcl�H�Q�.�E�·��H���e���������/f=��NG�8gS1��c4��Y��6%t�SDi �P@��Q*~b]`~�� ���P�L�V%}P=<��j�RJ�^      �   �  x���[n$7E�۫�d�%��"��
)e�qv���v0����B}T�A�#�RY �t�Q�K�"{U��OB����Vȯ�f�'�T�i�r�\�X��L�kـ��k�����������.ؤ��L" SG<�������ﯶY�/�v�k=�j�)ٽ�JZ�,�.���Ľn�lQ;���{�h��r	�$K�Uj��Y��ܻ�"�������S�+��������r\����r���X���u��ʆ{���%4�d�.c.(�cӖL��	]��'!�Q�'����W��1O�6x���3H���F��Abw�7lym���혗˷��:����"�?I�66fĲ|q��]RdJų[����'��[�ebM��p�ؓ$5l�;lKU�]��I�{����!�i@�_@���o����jҿ�����
e0Q�Q�	y�@"؆�t���["�9Ѳ|�����#VWMJ�FK깛D�����?�1����b�,���������㸞/�<zM�3J���hڋp�2�~g����H���%i���3�͉��C\�iҜm8���h�{z���U�;�[L��Ҁ����a�����F�6�؈����U�»�cd��i���M�ֲ��@�2+h�!g�y�� ^mz�m�;tpG��P�-F��ױϏO�OA~� ��_A�������9^     