# Spletno programiranje 2020/2021

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.


## 1. LP

### Funkcionalnosti spletne strani:

#### SmaugBudget - Budget tracker	

> Prvi korak na poti do finančne uspešnosti je nadzor nad našimi izdatki. Veliko ljudem se zgodi da se konec meseca vprašajo kam je šel denar. Mogoče si celo niso privoščili nobenih večjih nakupov zato jim je situacija še bolj sumljiva, nato pa ugotovijo da so krivi majhni nakupi po nekaj deset evrov. Aplikacija SmaugBudget omogoča enostaven pregled nad vašimi financami ter finančnimi cilji. Omogoča kategorizacijo, nastavljanje ciljev, analitični pregled, PDF izpise in še marsikaj.	
- [**Landing page s prijavo in registracijo**](https://github.com/sp-2020-2021/LP-30/blob/master/docs/index.html)	
    - prijava/registracija uporabnika,
    - e-mail authentication	

- [**Dashboard**](https://github.com/sp-2020-2021/LP-30/blob/master/docs/dashboard.html)	
    - Začetna stran po vpisu	
    - Kartice z osnovnim pregledom finančnega stanja
    - Alert section (Opozorila za bližajoče se račune, končane cilje, izpraznjene kuverte)
    - Osnovni pregled, analitika, zgodovina
    - Dodajanje plače avtomatsko vsak mesec tisti dan naredi priliv.

- [**Envelopes**](https://github.com/sp-2020-2021/LP-30/blob/master/docs/envelopes.html)	
    - Sistem sestavljanja mesečnega proračuna po kategorijah oziroma t.i. kuvertah.	
        - Možnost ustvarjanja, spreminjanja in brisanja kuvert ter nastavljanja količine denarja in vpis stroškov po mesecih.(Tudi nastavitev barve progress bara)
        - Možen premik po mesecih nazaj (za pregled) in naprej (za nastavitev proračuna za naslednji mesec)	
    - Hitri pregled na karticah in enostaven pregled v obliki progress barov. Kartice vsebujejo master-detail vzorec.

- [**Goals**](https://github.com/sp-2020-2021/LP-30/blob/master/docs/goals.html)	
    - Vpis, izbris in upravljanje s cilji, ki jih želiš dosečti v določenem časovnem obdobju.	
    - Možno avtomatsko dodajanje kuverte v proračun glede na cilj.	
    - Hitri pregled na karticah in enostaven pregled v obliki progress barov.	

- [**Bills**](https://github.com/sp-2020-2021/LP-30/blob/master/docs/bills.html)	
    - Vpis, izbris in upravljanje s ponavljajočimi se računi. Računi se avtomatsko dodajajo v vsakomesečni proračun v kuvertah če je izbrana opcija "monthly".	
    - Hitri pregled na karticah. Kartice vsebujejo master-detail vzorec.

- [**History**](https://github.com/sp-2020-2021/LP-30/blob/master/docs/history.html)	
    - Pregled vseh transakcij v obliki tabele, grafa in tortnega diagrama	
        - Možna prikaz glede na časovno obdobje, kategorije in rezultate iskanja. Vse te tri nastavitve upravljajo z vsemi elementi hkrati.	
    - Izvoz poročila v PDF (glede na izbrano časovno obdobje, kategorije,..)	

- [**Utilities**](https://github.com/sp-2020-2021/LP-30/blob/master/docs/utility.html)	
    - Pretvornik valut (API)	
    - Mikroaplikacija, ki omogoča pregled plačil v tvoji družbi in poskrbi za poravnane račune. (Plačila tudi avtomatsko doda med plačila)	

- [**Settings**](https://github.com/sp-2020-2021/LP-30/blob/master/docs/account.html)	
    - Nastavitve uporabniškega profila vključno s profilno sliko (nastavitev profilne slike bo mogoča z drag&drop)
    - Povezovanje z drugimi računi (partner, prijatelji). Sistem omogoča da deliš z njimi le določene kategorije oz. kuverte, ostale ostanejo skrite	

- **Ostale funkcionalnosti**	
    - Dark mode: Nahaja se v dropdown meniju v navigation baru.
    - Autocomplete: V modal formih pri poljih Category je planiran autocomplete
    
 
### Primerjava brsklalnikov:

- **Chrome**
    - Vse deluje tako kot implementirano saj je bil to naš primarni brsklalnik.

- **Edge**
    - Vse deluje povsem enako kot na Chrome-u, kar se ni čuditi, saj novi Edge sloni na Chromiumu, tako kot Chrome.
    
- **Firefox**
    - Prva razlika opazna na index.html ob odpiranju obrazcev za vpis/registracijo -> body se premakne v levo.
    - Drugačni gumbi v poljih kjer je potreben vnos številske vrednosti ter select polja.
    - Naslovi pisav so precej tanjši
    - Na strani Goals premaknjeni gumbi za dodajanje denarja.

- **Opera**
    - Na strani Envelopes tekst ob hoverju rumene kartice gleda izven polja
    - Vse ostalo enako kar se ponovno ni za čuditi saj je tudi Opera bazira na Chromiumu.

## 2. LP

Dinamična spletna aplikacija z logiko na strani strežnika


## 3. LP

Dinamična spletna aplikacija s podatkovno bazo


## 4. LP

SPA aplikacija na eni strani


## 5. LP

Varnostno zaščitena progresivna aplikacija
