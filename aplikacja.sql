-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Czas generowania: 13 Lip 2018, 16:41
-- Wersja serwera: 10.1.13-MariaDB
-- Wersja PHP: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `aplikacja`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `etap_produkcji`
--

CREATE TABLE `etap_produkcji` (
  `id_etapu_produkcji` int(10) UNSIGNED NOT NULL,
  `stanowisko_id_stanowiska` int(10) UNSIGNED NOT NULL,
  `nazwa_etapu` varchar(20) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `etap_produkcji`
--

INSERT INTO `etap_produkcji` (`id_etapu_produkcji`, `stanowisko_id_stanowiska`, `nazwa_etapu`) VALUES
(0, 0, 'W trakcie przyjęcia'),
(1, 2, 'Cięcie'),
(2, 1, 'Frezowanie'),
(3, 6, 'Heblowanie'),
(4, 3, 'lakierowanie/malowan'),
(5, 5, 'Oklejanie'),
(6, 4, 'Montaż/Pakowanie');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `magazyn`
--

CREATE TABLE `magazyn` (
  `id_produktu_magazynu` int(10) UNSIGNED NOT NULL,
  `produkcja_id_produkcji` int(10) UNSIGNED NOT NULL,
  `data_godzina_wprowadzenia` datetime NOT NULL,
  `stan_w_magazynie` tinyint(1) NOT NULL,
  `pracownik_id_pracownika` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `magazyn`
--

INSERT INTO `magazyn` (`id_produktu_magazynu`, `produkcja_id_produkcji`, `data_godzina_wprowadzenia`, `stan_w_magazynie`, `pracownik_id_pracownika`) VALUES
(2, 10, '2018-07-13 08:47:07', 1, 14),
(3, 11, '2018-07-13 08:45:10', 1, 7),
(4, 12, '2018-07-12 18:51:17', 1, 6),
(5, 13, '2018-07-13 08:47:05', 1, 14),
(6, 14, '2018-07-11 11:55:01', 1, 14),
(7, 15, '2018-07-12 18:58:44', 1, 14),
(8, 16, '2018-07-12 19:24:22', 1, 7),
(9, 17, '2018-07-13 11:36:56', 1, 14),
(10, 18, '2018-07-13 14:13:12', 1, 14),
(11, 19, '2018-07-13 14:31:25', 1, 14),
(12, 20, '2018-07-13 14:31:37', 1, 14),
(13, 21, '2018-07-13 14:34:58', 1, 14),
(14, 22, '2018-07-13 14:34:58', 1, 14);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `model_produktu`
--

CREATE TABLE `model_produktu` (
  `id_modelu` int(10) UNSIGNED NOT NULL,
  `produkt_id_produktu` int(10) UNSIGNED NOT NULL,
  `nazwa_modelu` varchar(45) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `model_produktu`
--

INSERT INTO `model_produktu` (`id_modelu`, `produkt_id_produktu`, `nazwa_modelu`) VALUES
(1, 1, 'MAKASSAR'),
(2, 1, 'FACTORYII'),
(3, 1, 'JAMIE'),
(4, 1, 'BO-11'),
(5, 1, 'PROWANSALSKI'),
(6, 1, 'LINOSA'),
(7, 2, 'BO-11');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `polprodukty`
--

CREATE TABLE `polprodukty` (
  `id_polproduktu` int(10) UNSIGNED NOT NULL,
  `nazwa_polproduktu` varchar(20) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `typ_polproduktu` varchar(20) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `polprodukty`
--

INSERT INTO `polprodukty` (`id_polproduktu`, `nazwa_polproduktu`, `typ_polproduktu`) VALUES
(1, 'Brzoza', 'Drewno'),
(2, 'Sosna', 'Drewno'),
(3, 'Buk', 'Drewno'),
(4, 'Dąb', 'Drewno'),
(5, 'Klon', 'Drewno'),
(6, 'Jesion', 'Drewno'),
(7, 'Mahoń', 'Drewno'),
(8, 'Lakier poliuretanowy', 'Lakier'),
(9, 'Lakier akryowy', 'Lakier'),
(10, 'Lakier UV', 'Lakier'),
(11, 'Lakier nitro', 'Lakier'),
(12, 'Nitro', 'Bejca'),
(13, 'Eko', 'Bejca'),
(14, 'Wodna', 'Bejca'),
(15, 'Lakobejca', 'Bejca'),
(16, 'Wkręty', 'Wkręt'),
(17, 'Kołki ustalające', 'Kołek'),
(18, 'Konfirmaty', 'Wkręt'),
(19, 'Dybel drewniany', 'Debel');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pracownik`
--

CREATE TABLE `pracownik` (
  `id_pracownika` int(10) UNSIGNED NOT NULL,
  `Imie` varchar(10) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `Nazwisko` varchar(20) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `Stanowisko` varchar(30) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `haslo` varchar(45) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `pracownik`
--

INSERT INTO `pracownik` (`id_pracownika`, `Imie`, `Nazwisko`, `Stanowisko`, `haslo`, `email`) VALUES
(1, 'Sebastian', 'Kowalski', 'Kierownik', '827ccb0eea8a706c4c34a16891f84e7b', 'Kowlaski@wp.pl'),
(3, 'Piotr', 'Pawel', 'Administracja', '827ccb0eea8a706c4c34a16891f84e7b', 'piotrpawel@wp.pl'),
(4, 'Jan', 'Kowalski', 'Zaopatrzeniowiec', 'e10adc3949ba59abbe56e057f20f883e', 'Jankowalski@wp.pl'),
(5, 'Jan', 'Kowal', 'Obsługa', '827ccb0eea8a706c4c34a16891f84e7b', 'JanKowal@wp.pl'),
(6, 'Jan ', 'Nowak', 'Operator CNC', '827ccb0eea8a706c4c34a16891f84e7b', 'Nowak@wp.pl'),
(7, 'Paweł', 'Kowalski', 'Operator piły panelowej', '827ccb0eea8a706c4c34a16891f84e7b', 'KowlaskiP@wp.pl'),
(8, 'Paweł', 'Nowak', 'Lakiernik', '827ccb0eea8a706c4c34a16891f84e7b', 'Nowakp@wp.pl'),
(9, 'Tomasz', 'Kowalski', 'Montaż/Pakownia', '827ccb0eea8a706c4c34a16891f84e7b', 'TomaszKowalski@wp.pl'),
(10, 'Andrzej', 'Nowak', 'Operator Okleiniarki', '827ccb0eea8a706c4c34a16891f84e7b', 'NowakAndrzej@wp.pl'),
(11, 'Mariusz', 'Kowalski', 'Montaż/Pakownia', '827ccb0eea8a706c4c34a16891f84e7b', 'MariuszKowalski@wp.pl'),
(12, 'Daniel', 'Nowak', 'Stolarz', '827ccb0eea8a706c4c34a16891f84e7b', 'NowakDaniel@wp.pl'),
(13, 'Sebastian', 'Nowak', 'Stolarz', '827ccb0eea8a706c4c34a16891f84e7b', 'SebastianNowak@wp.pl'),
(14, 'Andrzej', 'Kowal', 'Admin', '21232f297a57a5a743894a0e4a801fc3', 'admin@wp.pl');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `produkcja`
--

CREATE TABLE `produkcja` (
  `id_produkcji` int(10) UNSIGNED NOT NULL,
  `przekazanie_zamowienia_do_produkcji_id_przekazania_zamowienia` int(10) UNSIGNED NOT NULL,
  `etap_produkcji_id_etapu_produkcji` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `produkcja`
--

INSERT INTO `produkcja` (`id_produkcji`, `przekazanie_zamowienia_do_produkcji_id_przekazania_zamowienia`, `etap_produkcji_id_etapu_produkcji`) VALUES
(9, 3, 6),
(10, 1, 6),
(11, 3, 6),
(12, 2, 6),
(13, 5, 6),
(14, 6, 5),
(15, 10, 0),
(16, 9, 1),
(17, 11, 0),
(18, 7, 6),
(19, 4, 6),
(20, 4, 6),
(21, 7, 6),
(22, 8, 6);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `produkt`
--

CREATE TABLE `produkt` (
  `id_produktu` int(10) UNSIGNED NOT NULL,
  `nazwa_produktu` varchar(20) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `produkt`
--

INSERT INTO `produkt` (`id_produktu`, `nazwa_produktu`) VALUES
(1, 'Stół'),
(2, 'Stolik');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `przekazanie_zamowienia_do_produkcji`
--

CREATE TABLE `przekazanie_zamowienia_do_produkcji` (
  `id_przekazania_zamowienia` int(10) UNSIGNED NOT NULL,
  `zamowienie_id_zamowienie` int(10) UNSIGNED NOT NULL,
  `ilosc` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `przekazanie_zamowienia_do_produkcji`
--

INSERT INTO `przekazanie_zamowienia_do_produkcji` (`id_przekazania_zamowienia`, `zamowienie_id_zamowienie`, `ilosc`) VALUES
(1, 1, 0),
(2, 2, 0),
(3, 3, 0),
(4, 4, 0),
(5, 5, 0),
(6, 6, 0),
(7, 7, 0),
(8, 8, 0),
(9, 9, 0),
(10, 10, 0),
(11, 11, 0),
(12, 12, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `stanowisko`
--

CREATE TABLE `stanowisko` (
  `id_stanowiska` int(10) UNSIGNED NOT NULL,
  `pracownik_id_pracownika` int(10) UNSIGNED NOT NULL,
  `nazwa_maszyny` varchar(45) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `stanowisko`
--

INSERT INTO `stanowisko` (`id_stanowiska`, `pracownik_id_pracownika`, `nazwa_maszyny`) VALUES
(0, 5, 'Brak'),
(1, 6, 'CNC'),
(2, 7, 'Piła panelowa'),
(3, 8, 'Foliowanie/lakierowanie'),
(4, 9, 'Montaż/Pakownia'),
(5, 10, 'Okleiniarka'),
(6, 13, 'Heblarka');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `stan_magazynu_polproduktu`
--

CREATE TABLE `stan_magazynu_polproduktu` (
  `id_stanu` int(10) UNSIGNED NOT NULL,
  `polprodukty_id_polproduktu` int(10) UNSIGNED NOT NULL,
  `ilosc_polproduktu` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `stan_magazynu_polproduktu`
--

INSERT INTO `stan_magazynu_polproduktu` (`id_stanu`, `polprodukty_id_polproduktu`, `ilosc_polproduktu`) VALUES
(1, 1, 70),
(2, 2, 49),
(3, 3, 68),
(4, 4, 148),
(5, 5, 78),
(6, 6, 65),
(7, 7, 75),
(8, 8, 17),
(9, 9, 19),
(10, 10, 22),
(11, 11, 21),
(12, 12, 23),
(13, 13, 50),
(14, 14, 16),
(15, 15, 23),
(16, 16, 865),
(17, 17, 245),
(18, 18, 592),
(19, 19, 4300);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wyniki_produkcji`
--

CREATE TABLE `wyniki_produkcji` (
  `id_wynikow_produkcji` int(10) UNSIGNED NOT NULL,
  `produkcja_id_produkcji` int(10) UNSIGNED NOT NULL,
  `data_wyprodukowania` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `wyniki_produkcji`
--

INSERT INTO `wyniki_produkcji` (`id_wynikow_produkcji`, `produkcja_id_produkcji`, `data_wyprodukowania`) VALUES
(1, 9, '2018-07-11');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienie`
--

CREATE TABLE `zamowienie` (
  `id_zamowienie` int(10) UNSIGNED NOT NULL,
  `pracownik_id_pracownika` int(10) UNSIGNED NOT NULL,
  `produkt_id_produktu` int(10) UNSIGNED NOT NULL,
  `model_produktu_id_modelu` int(10) UNSIGNED NOT NULL,
  `ilosc_zamowienia` int(10) UNSIGNED NOT NULL,
  `data_zamowienia` date NOT NULL,
  `data_realizacji` date NOT NULL,
  `filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `zamowienie`
--

INSERT INTO `zamowienie` (`id_zamowienie`, `pracownik_id_pracownika`, `produkt_id_produktu`, `model_produktu_id_modelu`, `ilosc_zamowienia`, `data_zamowienia`, `data_realizacji`, `filename`) VALUES
(1, 14, 2, 7, 1, '2018-07-08', '2018-07-12', 'Lel'),
(2, 14, 1, 1, 1, '2018-07-08', '2018-07-14', 'lall'),
(3, 14, 1, 1, 2, '2018-07-08', '2018-07-29', 'ads'),
(4, 14, 2, 7, 2, '2018-07-09', '2018-09-01', 'asd'),
(5, 14, 1, 3, 1, '2018-07-09', '2018-07-21', 'as'),
(6, 14, 2, 7, 1, '2018-07-09', '2018-07-22', 'a'),
(8, 14, 1, 5, 1, '2018-07-12', '2018-07-29', 'FRONTEND.png'),
(9, 14, 2, 7, 1, '2018-07-12', '2018-07-29', 'FRONTEND.png'),
(10, 14, 2, 7, 1, '2018-07-12', '2018-07-28', 'FRONTEND.png'),
(11, 14, 1, 6, 1, '2018-07-13', '2018-08-24', 'stol.png'),
(12, 14, 2, 7, 1, '2018-07-13', '2018-09-27', 'stol.png');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zuzycie_polproduktow_na_produkt`
--

CREATE TABLE `zuzycie_polproduktow_na_produkt` (
  `polprodukty_id_polproduktu` int(10) UNSIGNED NOT NULL,
  `model_produktu_id_modelu` int(10) UNSIGNED NOT NULL,
  `Zuzycie` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `zuzycie_polproduktow_na_produkt`
--

INSERT INTO `zuzycie_polproduktow_na_produkt` (`polprodukty_id_polproduktu`, `model_produktu_id_modelu`, `Zuzycie`) VALUES
(1, 1, 5),
(2, 2, 8),
(2, 7, 3),
(4, 6, 12),
(5, 5, 6),
(6, 3, 10),
(7, 4, 7),
(8, 1, 1),
(8, 7, 1),
(9, 6, 1),
(10, 3, 1),
(10, 5, 1),
(12, 2, 1),
(12, 7, 1),
(13, 4, 1),
(16, 1, 20),
(16, 3, 10),
(16, 6, 5),
(17, 6, 6),
(18, 2, 4),
(18, 5, 4),
(19, 1, 15),
(19, 4, 13),
(19, 5, 10),
(19, 6, 13),
(19, 7, 11);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `etap_produkcji`
--
ALTER TABLE `etap_produkcji`
  ADD PRIMARY KEY (`id_etapu_produkcji`),
  ADD KEY `etap_produkcji_FKIndex1` (`stanowisko_id_stanowiska`);

--
-- Indexes for table `magazyn`
--
ALTER TABLE `magazyn`
  ADD PRIMARY KEY (`id_produktu_magazynu`),
  ADD KEY `magazyn_FKIndex1` (`produkcja_id_produkcji`),
  ADD KEY `magazyn_FKIndex2` (`pracownik_id_pracownika`);

--
-- Indexes for table `model_produktu`
--
ALTER TABLE `model_produktu`
  ADD PRIMARY KEY (`id_modelu`),
  ADD KEY `model_FKIndex1` (`produkt_id_produktu`);

--
-- Indexes for table `polprodukty`
--
ALTER TABLE `polprodukty`
  ADD PRIMARY KEY (`id_polproduktu`);

--
-- Indexes for table `pracownik`
--
ALTER TABLE `pracownik`
  ADD PRIMARY KEY (`id_pracownika`);

--
-- Indexes for table `produkcja`
--
ALTER TABLE `produkcja`
  ADD PRIMARY KEY (`id_produkcji`),
  ADD KEY `produkcja_FKIndex1` (`etap_produkcji_id_etapu_produkcji`),
  ADD KEY `produkcja_FKIndex2` (`przekazanie_zamowienia_do_produkcji_id_przekazania_zamowienia`);

--
-- Indexes for table `produkt`
--
ALTER TABLE `produkt`
  ADD PRIMARY KEY (`id_produktu`);

--
-- Indexes for table `przekazanie_zamowienia_do_produkcji`
--
ALTER TABLE `przekazanie_zamowienia_do_produkcji`
  ADD PRIMARY KEY (`id_przekazania_zamowienia`),
  ADD KEY `przekazanie_zamowienia_do_produkcji_FKIndex1` (`zamowienie_id_zamowienie`);

--
-- Indexes for table `stanowisko`
--
ALTER TABLE `stanowisko`
  ADD PRIMARY KEY (`id_stanowiska`),
  ADD KEY `stanowisko_FKIndex1` (`pracownik_id_pracownika`);

--
-- Indexes for table `stan_magazynu_polproduktu`
--
ALTER TABLE `stan_magazynu_polproduktu`
  ADD PRIMARY KEY (`id_stanu`),
  ADD KEY `stan_magazynu_polproduktu_FKIndex1` (`polprodukty_id_polproduktu`);

--
-- Indexes for table `wyniki_produkcji`
--
ALTER TABLE `wyniki_produkcji`
  ADD PRIMARY KEY (`id_wynikow_produkcji`),
  ADD KEY `wyniki_produkcji_FKIndex1` (`produkcja_id_produkcji`);

--
-- Indexes for table `zamowienie`
--
ALTER TABLE `zamowienie`
  ADD PRIMARY KEY (`id_zamowienie`),
  ADD KEY `zamowienie_FKIndex1` (`model_produktu_id_modelu`),
  ADD KEY `zamowienie_FKIndex2` (`pracownik_id_pracownika`),
  ADD KEY `zamowienie_FKIndex3` (`produkt_id_produktu`);

--
-- Indexes for table `zuzycie_polproduktow_na_produkt`
--
ALTER TABLE `zuzycie_polproduktow_na_produkt`
  ADD PRIMARY KEY (`polprodukty_id_polproduktu`,`model_produktu_id_modelu`),
  ADD KEY `polprodukty_has_produkt_FKIndex1` (`polprodukty_id_polproduktu`),
  ADD KEY `polprodukty_has_produkt_FKIndex2` (`model_produktu_id_modelu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `etap_produkcji`
--
ALTER TABLE `etap_produkcji`
  MODIFY `id_etapu_produkcji` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT dla tabeli `magazyn`
--
ALTER TABLE `magazyn`
  MODIFY `id_produktu_magazynu` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT dla tabeli `model_produktu`
--
ALTER TABLE `model_produktu`
  MODIFY `id_modelu` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT dla tabeli `polprodukty`
--
ALTER TABLE `polprodukty`
  MODIFY `id_polproduktu` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT dla tabeli `pracownik`
--
ALTER TABLE `pracownik`
  MODIFY `id_pracownika` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT dla tabeli `produkcja`
--
ALTER TABLE `produkcja`
  MODIFY `id_produkcji` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT dla tabeli `produkt`
--
ALTER TABLE `produkt`
  MODIFY `id_produktu` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT dla tabeli `przekazanie_zamowienia_do_produkcji`
--
ALTER TABLE `przekazanie_zamowienia_do_produkcji`
  MODIFY `id_przekazania_zamowienia` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT dla tabeli `stanowisko`
--
ALTER TABLE `stanowisko`
  MODIFY `id_stanowiska` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT dla tabeli `stan_magazynu_polproduktu`
--
ALTER TABLE `stan_magazynu_polproduktu`
  MODIFY `id_stanu` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT dla tabeli `wyniki_produkcji`
--
ALTER TABLE `wyniki_produkcji`
  MODIFY `id_wynikow_produkcji` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT dla tabeli `zamowienie`
--
ALTER TABLE `zamowienie`
  MODIFY `id_zamowienie` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
