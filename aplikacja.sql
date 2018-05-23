-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 15 Kwi 2018, 18:54
-- Wersja serwera: 10.1.28-MariaDB
-- Wersja PHP: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
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
(3, 8, 'Heblowanie'),
(4, 3, 'lakierowanie/malowan'),
(5, 5, 'Oklejanie'),
(6, 4, 'Montaż/Pakowanie');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `magazyn`
--

CREATE TABLE `magazyn` (
  `id_produktu_magazynu` int(10) UNSIGNED NOT NULL,
  `produkcja_stolu_id_produkcji` int(10) UNSIGNED NOT NULL,
  `data_godzina_wprowadzenia` datetime NOT NULL,
  `stan_w_magazynie` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `magazyn`
--

INSERT INTO `magazyn` (`id_produktu_magazynu`, `produkcja_stolu_id_produkcji`, `data_godzina_wprowadzenia`, `stan_w_magazynie`) VALUES
(1, 1, '2018-05-17 17:31:56', 1),
(3, 9, '2018-05-17 16:05:55', 1);

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
  `id_pracownika` int(11) NOT NULL,
  `Imie` varchar(10) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `Nazwisko` varchar(20) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `Stanowisko` varchar(20) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
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
(7, 'Paweł', 'Kowalski', 'Stolarz', '827ccb0eea8a706c4c34a16891f84e7b', 'KowlaskiP@wp.pl'),
(8, 'Paweł', 'Nowak', 'Lakiernik', '827ccb0eea8a706c4c34a16891f84e7b', 'Nowakp@wp.pl'),
(9, 'Tomasz', 'Kowalski', 'Montaż/Pakownia', '827ccb0eea8a706c4c34a16891f84e7b', 'TomaszKowalski@wp.pl'),
(10, 'Andrzej', 'Nowak', 'Lakiernik', '827ccb0eea8a706c4c34a16891f84e7b', 'NowakAndrzej@wp.pl'),
(11, 'Mariusz', 'Kowalski', 'Montaż/Pakownia', '827ccb0eea8a706c4c34a16891f84e7b', 'MariuszKowalski@wp.pl'),
(12, 'Daniel', 'Nowak', 'Stolarz', '827ccb0eea8a706c4c34a16891f84e7b', 'NowakDaniel@wp.pl'),
(13, 'Sebastian', 'Nowak', 'Stolarz', '827ccb0eea8a706c4c34a16891f84e7b', 'SebastianNowak@wp.pl'),
(14, 'Admin', 'Admin', 'Admin', '21232f297a57a5a743894a0e4a801fc3', 'admin@wp.pl');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `produkcja_stolu`
--

CREATE TABLE `produkcja_stolu` (
  `id_produkcji` int(10) UNSIGNED NOT NULL,
  `etap_produkcji_id_etapu_produkcji` int(10) UNSIGNED NOT NULL,
  `Zamowienie_id_zamowienie` int(10) UNSIGNED NOT NULL,
  `proces_technologiczny` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `produkcja_stolu`
--

INSERT INTO `produkcja_stolu` (`id_produkcji`, `etap_produkcji_id_etapu_produkcji`, `Zamowienie_id_zamowienie`, `proces_technologiczny`) VALUES
(1, 1, 1, 'Kolor:drewniany\r\nMateriał:Sosna\r\nSzerokość:100 cm\r\nWysokość:40 cm\r\nGłębokość:50 cm\r\nOdcień drewna:średnie\r\nWykończenie:polerowane\r\nKształt blatu:prostokątny Styl:nowoczesny\r\nMateriał blatu:drewno\r\nMateriał nóg:drewno\r\nKolor nóg:drewniany\r\nRodzaj nóg:4 '),
(2, 6, 2, 'Kolor:drewniany,antracytowy\r\nMateriał:drewno\r\nSzerokość:200 cm\r\nWysokość:75 cm\r\nGłębokość:90 cm\r\nRodzaj drewna:buk\r\nOdcień drewna:ciemne\r\nWykończenie:naturalne\r\nKształt blatu:prostokątny\r\nStyl:industrialny\r\nMateriał blatu:drewno\r\nRodzaj nóg:sanki'),
(3, 6, 3, 'Kolor:drewniany\r\nMateriał:drewno\r\nSzerokość:200 cm\r\nWysokość:75 cm\r\nGłębokość:90 cm\r\nRodzaj drewna:sosna\r\nOdcień drewna:jasne\r\nWykończenie:naturalne\r\nKształt blatu:prostokątny\r\nMateriał blatu:drewno\r\n'),
(4, 6, 4, 'Kolor:drewniany\r\nMateriał:Sosna\r\nSzerokość:100 cm\r\nWysokość:40 cm\r\nGłębokość:50 cm\r\nOdcień drewna:średnie\r\nnWykończenie:poler1owane\r\nKształt blatu:prostokątny Styl:nowoczesny\r\nMateriał blatu:drewno\r\nMateriał nóg:drewno\r\nKolor nóg:drewniany\r\nRodzaj nóg:4 '),
(9, 0, 12, 'Kolor:drewniany\nMateriał:Sosna\nSzerokość:100 cm\nWysokość:40 cm\nGłębokość:50 cm\nOdcień drewna:średnie\nWykończenie:polerowane\nKształt blatu:prostokątny Styl:nowoczesny\nMateriał blatu:drewno\nMateriał nóg:drewno\nKolor nóg:drewniany\nRodzaj nóg:4 ');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `produkt`
--

CREATE TABLE `produkt` (
  `id_produktu` int(10) UNSIGNED NOT NULL,
  `nazwa_produktu` varchar(45) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `produkt`
--

INSERT INTO `produkt` (`id_produktu`, `nazwa_produktu`) VALUES
(1, 'MAKASSAR'),
(2, 'FACTORYII'),
(3, 'JAMIE'),
(4, 'BO-11'),
(5, 'PROWANSALSKI'),
(6, 'LINOSA');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `stanowisko`
--

CREATE TABLE `stanowisko` (
  `id_stanowiska` int(10) UNSIGNED NOT NULL,
  `pracownik_id_pracownika` int(11) NOT NULL,
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
(8, 13, 'Heblarka');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `stan_magazynu_polproduktu`
--

CREATE TABLE `stan_magazynu_polproduktu` (
  `id_stanu` int(10) UNSIGNED NOT NULL,
  `Polprodukty_id_polproduktu` int(10) UNSIGNED NOT NULL,
  `ilosc_polproduktu` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `stan_magazynu_polproduktu`
--

INSERT INTO `stan_magazynu_polproduktu` (`id_stanu`, `Polprodukty_id_polproduktu`, `ilosc_polproduktu`) VALUES
(1, 1, 95),
(2, 2, 50),
(3, 3, 68),
(4, 4, 160),
(5, 5, 84),
(6, 6, 45),
(7, 7, 16),
(8, 8, 19),
(9, 9, 20),
(10, 10, 24),
(11, 11, 9),
(12, 12, 30),
(13, 13, 50),
(14, 14, 16),
(15, 15, 23),
(16, 16, 980),
(17, 17, 151),
(18, 18, 596),
(19, 19, 4475);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wyniki_produkcji`
--

CREATE TABLE `wyniki_produkcji` (
  `id_wynikow_produkcji` int(10) UNSIGNED NOT NULL,
  `produkcja_stolu_id_produkcji` int(10) UNSIGNED NOT NULL,
  `data_wyprodukowania` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `wyniki_produkcji`
--

INSERT INTO `wyniki_produkcji` (`id_wynikow_produkcji`, `produkcja_stolu_id_produkcji`, `data_wyprodukowania`) VALUES
(1, 3, '2018-05-09'),
(2, 2, '2018-05-08');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienie`
--

CREATE TABLE `zamowienie` (
  `id_zamowienie` int(10) UNSIGNED NOT NULL,
  `pracownik_id_pracownika` int(11) NOT NULL,
  `Produkt_id_produktu` int(10) UNSIGNED NOT NULL,
  `nazwa_zamowienia` varchar(20) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `ilosc_zamowienia` int(11) NOT NULL,
  `data_zamowienia` date NOT NULL,
  `data_realizacji` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `zamowienie`
--

INSERT INTO `zamowienie` (`id_zamowienie`, `pracownik_id_pracownika`, `Produkt_id_produktu`, `nazwa_zamowienia`, `ilosc_zamowienia`, `data_zamowienia`, `data_realizacji`) VALUES
(1, 1, 1, 'Stół', 1, '2018-03-14', '2018-03-31'),
(2, 1, 2, 'Stół', 1, '2018-03-14', '2018-03-31'),
(3, 1, 3, 'Stół', 1, '2018-03-15', '2018-05-31'),
(4, 1, 1, 'Stół', 1, '2018-05-11', '2018-06-14'),
(12, 14, 1, 'Stół', 1, '2018-05-17', '2018-06-21');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zuzycie_polproduktow_na_produkt`
--

CREATE TABLE `zuzycie_polproduktow_na_produkt` (
  `Polprodukty_id_polproduktu` int(10) UNSIGNED NOT NULL,
  `Produkt_id_produktu` int(10) UNSIGNED NOT NULL,
  `Zuzycie` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `zuzycie_polproduktow_na_produkt`
--

INSERT INTO `zuzycie_polproduktow_na_produkt` (`Polprodukty_id_polproduktu`, `Produkt_id_produktu`, `Zuzycie`) VALUES
(1, 1, 5),
(2, 2, 8),
(4, 6, 12),
(5, 5, 6),
(6, 3, 10),
(7, 4, 7),
(8, 1, 1),
(9, 6, 1),
(10, 3, 1),
(10, 5, 1),
(12, 2, 1),
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
(19, 6, 13);

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
  ADD KEY `Magazyn_FKIndex2` (`produkcja_stolu_id_produkcji`);

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
-- Indexes for table `produkcja_stolu`
--
ALTER TABLE `produkcja_stolu`
  ADD PRIMARY KEY (`id_produkcji`),
  ADD KEY `produkcja_stolu_FKIndex2` (`Zamowienie_id_zamowienie`),
  ADD KEY `produkcja_stolu_FKIndex3` (`etap_produkcji_id_etapu_produkcji`);

--
-- Indexes for table `produkt`
--
ALTER TABLE `produkt`
  ADD PRIMARY KEY (`id_produktu`);

--
-- Indexes for table `stanowisko`
--
ALTER TABLE `stanowisko`
  ADD PRIMARY KEY (`id_stanowiska`),
  ADD KEY `maszyny_FKIndex1` (`pracownik_id_pracownika`);

--
-- Indexes for table `stan_magazynu_polproduktu`
--
ALTER TABLE `stan_magazynu_polproduktu`
  ADD PRIMARY KEY (`id_stanu`),
  ADD KEY `Stan_magazynu_polproduktu_FKIndex1` (`Polprodukty_id_polproduktu`);

--
-- Indexes for table `wyniki_produkcji`
--
ALTER TABLE `wyniki_produkcji`
  ADD PRIMARY KEY (`id_wynikow_produkcji`),
  ADD KEY `wyniki_produkcji_FKIndex1` (`produkcja_stolu_id_produkcji`);

--
-- Indexes for table `zamowienie`
--
ALTER TABLE `zamowienie`
  ADD PRIMARY KEY (`id_zamowienie`),
  ADD KEY `Zamowienie_FKIndex2` (`Produkt_id_produktu`),
  ADD KEY `Zamowienie_FKIndex3` (`pracownik_id_pracownika`);

--
-- Indexes for table `zuzycie_polproduktow_na_produkt`
--
ALTER TABLE `zuzycie_polproduktow_na_produkt`
  ADD PRIMARY KEY (`Polprodukty_id_polproduktu`,`Produkt_id_produktu`),
  ADD KEY `Magazyn_polprodukty_has_Produkt_FKIndex1` (`Polprodukty_id_polproduktu`),
  ADD KEY `Magazyn_polprodukty_has_Produkt_FKIndex2` (`Produkt_id_produktu`);

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
  MODIFY `id_produktu_magazynu` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT dla tabeli `polprodukty`
--
ALTER TABLE `polprodukty`
  MODIFY `id_polproduktu` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT dla tabeli `pracownik`
--
ALTER TABLE `pracownik`
  MODIFY `id_pracownika` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT dla tabeli `produkcja_stolu`
--
ALTER TABLE `produkcja_stolu`
  MODIFY `id_produkcji` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT dla tabeli `produkt`
--
ALTER TABLE `produkt`
  MODIFY `id_produktu` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT dla tabeli `stanowisko`
--
ALTER TABLE `stanowisko`
  MODIFY `id_stanowiska` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT dla tabeli `stan_magazynu_polproduktu`
--
ALTER TABLE `stan_magazynu_polproduktu`
  MODIFY `id_stanu` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT dla tabeli `wyniki_produkcji`
--
ALTER TABLE `wyniki_produkcji`
  MODIFY `id_wynikow_produkcji` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT dla tabeli `zamowienie`
--
ALTER TABLE `zamowienie`
  MODIFY `id_zamowienie` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
