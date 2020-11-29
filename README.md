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
    - Nastavitve uporabniškega profila vključno s profilno sliko.
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


### Naprave  

- Naša spletna stran deluja na računalnikih, ter tabličnih računalniki v pokončnem in ležečem položaju.  
  

### Knjižnice  

#### [Body-parser](https://www.npmjs.com/package/body-parser)  
- Branje body requesta.  
  
#### Cron(https://www.npmjs.com/package/cron)  
- Periodično posodabljanje tarif za pretvorbo valut  
- Periodično vstavljanje računov med stroške  
- Postavljanje plač v prejšni mesec (in ob posodabljanju plače)  
  
#### [jssha](https://www.npmjs.com/package/jssha)  
- Enkripcija gesel  
  
#### [multer](https://www.npmjs.com/package/multer)  
- Nalaganje slik ter vrnitev poti do slike  
  
#### [Node-rest-client](https://www.npmjs.com/package/node-rest-client)  
- Upravljanje z zahtevami na REST Clientu  
  
#### [Nodemailer](https://www.npmjs.com/package/nodemailer)  
- Pošiljanje e-pošte za potrditev registracije in ponastavitev gesla.
  
#### [Nodemailer-mailgun-transport](https://www.npmjs.com/package/nodemailer-mailgun-transport)  
- Pošiljanje e-pošte za potrditev registracije in ponastavitev gesla.  
  
#### pdf-creator-node(https://www.npmjs.com/package/pdf-creator-node)  
- Ustvarjanje preprostih PDF poročil.  
  
#### [Chart-js](https://www.chartjs.org/)  
- Ustvarjanje grafov  
  
#### [Date-range-selector](https://www.daterangepicker.com/)  
- Izbira dveh datumov za filtriranje podatkov  
  
#### [Bootstrap select](https://developer.snapappointments.com/bootstrap-select/)  
- Za multiselect, dropdown, izbiro envelopov itd.  
  
  
### Uporabniška vnosna polja  

#### Landing page  

- Registracija  
    - Ime: Dovoljene so vse črke angleške abecede. Niz je omejen na največjo dolžino 20 znakov.  
    - Priimek: Dovoljene so vse črke angleške abecede. Niz je omejen na največjo dolžino 20 znakov.  
    - E-mail: Polje mora vsebovati znak @.  
    - Geslo: Mora vsebovati vsaj 6 znakov in izpolnjevati vsaj eno od sledečih kategorij:  
        - vsebuje vsaj eno malo in vsaj en veliko tiskano črko,  
        - vsebuje vsaj eno malo tiskano črko in vsaj eno številko,  
        - vsebuje vsaj eno veliko tiskano črko in vsaj eno številko  
          
#### Dashboard  

- Change Income  
    - Plača: Dovoljen je vnos decimalnega števila z največ 2 decimalni mesti in decimalno piko.   
    - Dan v mesecu: Število med 1 in 28.  
      
      
#### Envelopes  

- Add Expense  
    - Category: Uporabnik mora izbrati eno izmed kategorij. Izbira ne sme ostati na Choose a Category.  
    - Recipient: Dovoljen je vnos malih in velikih tiskanih črk angleške abecede, števil ter posebnih znakov (_ @ . / # & + -). Niz je omejen na največjo dolžino 20 znakov.  
    - Amount: Dovoljen je vnos decimalnega števila z največ 2 decimalni mesti in decimalno piko.  
    - Date: Dovoljen je vnos datuma, ki je "manjši" ali enak današnjemu.  
      
- Add Envelope  
    - Category: Uporabnik mora izbrati eno izmed kategorij. Če izbere kategorijo "Make your own" se mu odpre novo vnosno polje kjer je dovoljen vnos malih in velikih tiskanih črk angleške abecede, števil ter posebnih znakov (_ @ . / # & + -). Niz je omejen na največjo dolžino 20 znakov.  Izbira ne sme ostati na Select Category.
    - Amount: Dovoljen je vnos decimalnega števila z največ 2 decimalni mesti in decimalno piko.  
      
- Edit Envelope
    - New Budget: Dovoljen je vnos decimalnega števila z največ 2 decimalni mesti in decimalno piko.  
      
      
#### Goals  

- Add Money  
    - Amount: Dovoljen je vnos decimalnega števila z največ 2 decimalni mesti in decimalno piko.  
      
- Add Goal  
    - What's your goal: Dovoljen je vnos malih in velikih tiskanih črk angleške abecede, števil ter posebnih znakov (_ @ . / # & + -). Niz je omejen na največjo dolžino 20 znakov.  
    - Category: Uporabnik mora izbrati eno izmed kategorij. Izbira ne sme ostati na Select Category.  
    - How much: Dovoljen je vnos decimalnega števila z največ 2 decimalni mesti in decimalno piko. 
    - Date: Dovoljen je vnos datuma, ki je "večji" ali enak današnjemu. 
      
- Edit Goal  
    - What's your goal: Dovoljen je vnos malih in velikih tiskanih črk angleške abecede, števil ter posebnih znakov (_ @ . / # & + -). Niz je omejen na največjo dolžino 20 znakov.  
    - Category: Uporabnik mora izbrati eno izmed kategorij. Izbira ne sme ostati na Select Category.  
    - How much: Dovoljen je vnos decimalnega števila z največ 2 decimalni mesti in decimalno piko.  
    - Date: Dovoljen je vnos datuma, ki je "večji" ali enak današnjemu.  
      
        
#### Bills  

- Add bill  
    - Category: Uporabnik mora izbrati eno izmed kategorij. Izbira ne sme ostati na Select Category.  
    - Payee: What's your goal: Dovoljen je vnos malih in velikih tiskanih črk angleške abecede, števil ter posebnih znakov (_ @ . / # & + -). Niz je omejen na največjo dolžino 20  
    - Amount: Dovoljen je vnos decimalnega števila z največ 2 decimalni mesti in decimalno piko.  
    - Date: Date: Dovoljen je vnos datuma, ki je "večji" ali enak današnjemu.  
    - How often: Izbrana mora biti ena izmed opcij.  
      
- Edit bill  
    - Category: Uporabnik mora izbrati eno izmed kategorij. Izbira ne sme ostati na Select Category.  
    - Payee: What's your goal: Dovoljen je vnos malih in velikih tiskanih črk angleške abecede, števil ter posebnih znakov (_ @ . / # & + -). Niz je omejen na največjo dolžino 20  
    - Amount: Dovoljen je vnos decimalnega števila z največ 2 decimalni mesti in decimalno piko.  
    - Date: Date: Dovoljen je vnos datuma, ki je "večji" ali enak današnjemu.  
    - How often: Izbrana mora biti ena izmed opcij.  
      
        
#### History  

- Edit expense  
    - Recipient: What's your goal: Dovoljen je vnos malih in velikih tiskanih črk angleške abecede, števil ter posebnih znakov (_ @ . / # & + -). Niz je omejen na največjo dolžino 20  
    - Amount: Dovoljen je vnos decimalnega števila z največ 2 decimalni mesti in decimalno piko.  
    - Date: Dovoljen je vnos datuma, ki je "manjši" ali enak današnjemu.  
      
        
#### Utilities  

- Friend groups  
    - Bill amount: Dovoljen je vnos decimalnega števila z največ 2 decimalni mesti in decimalno piko.  
    - Money paid: Dovoljen je vnos decimalnega števila z največ 2 decimalni mesti in decimalno piko.  
      
        
#### Settings  

- Account  
    - First name: Dovoljene so vse črke angleške abecede. Niz je omejen na največjo dolžino 20 znakov.  
    - Last name: Dovoljene so vse črke angleške abecede. Niz je omejen na največjo dolžino 20 znakov.  
    - Geslo: Mora vsebovati vsaj 6 znakov in izpolnjevati vsaj eno od sledečih kategorij:  
        - vsebuje vsaj eno malo in vsaj en veliko tiskano črko,  
        - vsebuje vsaj eno malo tiskano črko in vsaj eno številko,  
        - vsebuje vsaj eno veliko tiskano črko in vsaj eno številko  
      
- Connections  
    - Add connection  
        - Connection name: Dovoljen je vnos malih in velikih tiskanih črk angleške abecede ter števil.  
          
    - Edit connection  
        - Connection name: Dovoljen je vnos malih in velikih tiskanih črk angleške abecede ter števil.  
          



## 3. LP  
  
### [Povezava do aplikacije](https://smaugbudget.herokuapp.com/)  

  
### Navodila za uporabo z Docker  

1. Vpišemo ukaz docker-compose up  
2. Gremo na brsklalnik na spletni naslov localhost:8080/db  
3. Ustvarimo podatke v bazi  
4. Gremo na brsklalnik na spletni naslov localhost:8080


## 4. LP

SPA aplikacija na eni strani


## 5. LP

Varnostno zaščitena progresivna aplikacija
