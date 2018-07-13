var mysql   = require("mysql");
var multer = require('multer');
var DIR = './src/assets/uploads/';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/assets/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single('photo');

function REST_ROUTER(router,connection,md5) {
  var self = this;
  self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
  router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
  router.get("/",function(req,res){
    res.json({"Message" : "Widaj swiecie !"});
  });
  router.get("/users",function(req,res){
    var query = "SELECT * FROM ??";
    var table = ["pracownik"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "users" : rows});
      }
    });
  });
  router.post('/upload', function (req, res, next) {
    var path = '';
    upload(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        console.log(err);
        return res.status(422).send("an Error occured")
      }
      console.log(req.file);
      path = req.file.originalname;
      res.json(path);
    });
  });
  router.post("/newUser",function(req,res){
    var query = "INSERT INTO ?? VALUES (null,?,?,?,?,?)";
    var table = ["pracownik", req.body.Imie, req.body.Nazwisko, req.body.Stanowisko, req.body.haslo, req.body.email];
    query = mysql.format(query, table);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Pracownik został dodany do bazy"});
      }
    });
  });
  router.delete("/deleteUser/:id",function(req,res){
    var query = "DELETE from ?? WHERE ??=?";
    var table = ["pracownik","id_pracownika",req.params.id];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Usunięto praconika o id "+req.params.id});
      }
    });
  });
  router.delete("/deleteUserWorkplace/:id",function(req,res){
    var query = "DELETE from ?? WHERE ??=?";
    var table = ["stanowisko","id_stanowiska",req.params.id];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Usunięto praconika ze stanowiska o id "+req.params.id});
      }
    });
  });
  router.post("/newUserWorkplace",function(req,res){
    var query = "INSERT INTO ?? VALUES (null,?,?)";
    var table = ["stanowisko", req.body.pracownik_id_pracownika, req.body.nazwa_maszyny];
    query = mysql.format(query, table);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Użytkownik został przydzielony do stanowiska"});
      }
    });
  })
  router.get("/machines",function(req,res){
    var query = "SELECT id_stanowiska, nazwa_maszyny, id_pracownika, Imie, Nazwisko FROM ??, ?? where pracownik_id_pracownika=id_pracownika";
    var table = ["stanowisko", "pracownik"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "machines" : rows});
      }
    });
  });
  router.put("/user",function(req,res){
    var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
    var table = ["pracownik", "Imie", req.body.Imie, "Nazwisko", req.body.Nazwisko, "Stanowisko", req.body.Stanowisko, "haslo", req.body.haslo, "email", req.body.email, "id_pracownika", req.body.id_pracownika];
    query = mysql.format(query, table);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Dokonano modyfikacji w tabeli pracownik"});
      }
    });
  });
  router.put("/UserWorkplace",function(req,res){
    var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
    var table = ["stanowisko", "pracownik_id_pracownika", req.body.pracownik_id_pracownika, "nazwa_maszyny", req.body.nazwa_maszyny, "id_stanowiska", req.body.id_stanowiska];
    query = mysql.format(query, table);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Dokonano modyfikacji w tabeli stanowisko"});
      }
    });
  });
  router.get("/halfProducts",function(req,res){
    var query = "SELECT id_stanu, id_polproduktu, nazwa_polproduktu, typ_polproduktu, ilosc_polproduktu FROM ??, ?? WHERE polprodukty_id_polproduktu = id_polproduktu";
    var table = ["stan_magazynu_polproduktu", "polprodukty"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "halfProducts" : rows});
      }
    });
  });
  router.post("/AddnewHalfProducts",function(req,res) {
    var query = "INSERT INTO ?? VALUES (null,?,?)";
    var table = ["polprodukty", req.body.nazwa_polproduktu, req.body.typ_polproduktu];
    query = mysql.format(query, table);
    connection.query(query, function (err) {
      if (err) {
        res.json({"Error": true, "Message": "Error executing MySQL query"});
      } else {
        connection.query('SELECT max(id_polproduktu) as max from polprodukty', function (err, rows) {
          var ret = JSON.parse(JSON.stringify(rows));
          id_pol = ret[0].max;
          var query2 = "INSERT INTO ?? VALUES (null,?,?)";
          var table2 = ["stan_magazynu_polproduktu", id_pol, req.body.ilosc_polproduktu];
          query2 = mysql.format(query2, table2);
          connection.query(query2, function (err) {
            if (err) {
              res.json({"Error": true, "Message": "Error executing MySQL query"});
            } else {
              res.json({"Error": false, "Message": "Dodano nowy półprodukt"});
            }
          });
        });
      }
    });
  });
  router.put("/EditHalfProducts",function(req,res){
    var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
    var table = ["stan_magazynu_polproduktu", "polprodukty_id_polproduktu", req.body.polprodukty_id_polproduktu, "ilosc_polproduktu", req.body.ilosc_polproduktu, "id_stanu", req.body.id_stanu];
    query = mysql.format(query, table);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Dokonano modyfikacji stanu półproduktu"});
      }
    });
  });
  router.get("/viewOfOrder",function(req,res){
    var query = "SELECT id_zamowienie, pracownik_id_pracownika, id_produktu, nazwa_produktu, model_produktu_id_modelu, ilosc_zamowienia, data_zamowienia, data_realizacji, filename, nazwa_modelu FROM ??, ??, ?? WHERE zamowienie.produkt_id_produktu = produkt.id_produktu AND zamowienie.model_produktu_id_modelu = model_produktu.id_modelu";
    var table = ["zamowienie", "produkt", "model_produktu"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "viewOfOrder" : rows});
      }
    });
  });
  router.post("/newOrder",function(req,res){
    var query = "INSERT INTO ?? VALUES (null,?,?,?,?,?,?,?)";
    var table = ["zamowienie", req.body.pracownik_id_pracownika, req.body.produkt_id_produktu, req.body.model_produktu_id_modelu, req.body.ilosc_zamowienia, req.body.data_zamowienia, req.body.data_realizacji, req.body.filename];
    query = mysql.format(query, table);
    connection.query(query,function(err){
          if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
            connection.query('SELECT max(id_zamowienie) as max from zamowienie', function (err, rows) {
            var ret = JSON.parse(JSON.stringify(rows));
            id_zam = ret[0].max;
            var query2 = "INSERT INTO ?? VALUES (null,?,?)";
            var table2 = ["przekazanie_zamowienia_do_produkcji", id_zam, req.body.ilosc_zamowienia];
            query2 = mysql.format(query2, table2);
            connection.query(query2, function (err) {
              if (err) {
                res.json({"Error": true, "Message": "Error executing MySQL query"});
              } else {
                var query3 = "SELECT polprodukty_id_polproduktu, Zuzycie FROM ?? WHERE ?? = ?";
                var table3 = ["zuzycie_polproduktow_na_produkt", "model_produktu_id_modelu", req.body.model_produktu_id_modelu];
                query3 = mysql.format(query3,table3);
                connection.query(query3,function(err, rows) {
                  if (err) {
                    res.json({"Error": true, "Message": "Error executing MySQL query"});
                    } else {
                    var values = [];
                    for ( var i = 0; i<rows.length; i++) {
                      var row = rows[i]['Zuzycie'];
                      var row2 = rows[i]['polprodukty_id_polproduktu'];
                      values.push({
                        'Zuzycie': row,
                        'polprodukty_id_polproduktu': row2
                      });
                      var query4 = "SELECT ilosc_polproduktu, stan_magazynu_polproduktu.polprodukty_id_polproduktu, Zuzycie FROM ??, ?? WHERE ?? = ? AND ?? = ? AND ?? = ??";
                      var table4 = ['stan_magazynu_polproduktu', 'zuzycie_polproduktow_na_produkt', 'stan_magazynu_polproduktu.polprodukty_id_polproduktu', rows[i]['polprodukty_id_polproduktu'], "model_produktu_id_modelu", req.body.model_produktu_id_modelu, "zuzycie_polproduktow_na_produkt.polprodukty_id_polproduktu", "stan_magazynu_polproduktu.polprodukty_id_polproduktu"];
                      query4 = mysql.format(query4,table4);
                      connection.query(query4,function (err, rows2) {
                        if (err) {
                          res.json({"Error": true, "Message": "Error executing MySQL query"});
                          } else {
                          var values2 = [];
                          for (var j = 0; j<rows2.length; j++) {
                            var query5 = "UPDATE ?? SET  ?? = ? WHERE ?? = ?";
                            var table5 = ["stan_magazynu_polproduktu", "ilosc_polproduktu", rows2[j]['ilosc_polproduktu'] - (rows2[j]['Zuzycie'] * req.body.ilosc_zamowienia), "polprodukty_id_polproduktu", rows2[j]['polprodukty_id_polproduktu']];
                            query5 = mysql.format(query5, table5);
                            connection.query(query5);
                          }
                        }
                      });
                    }
                    res.json({"Error": false, "Message": "Zamówienie zostało złożone"});
                  }
                });
              }
            });
            });
          }
    });
  });
  router.get("/productionStage",function (req,res) {
    var query = "SELECT id_etapu_produkcji, nazwa_maszyny, nazwa_etapu FROM ??, ?? WHERE stanowisko_id_stanowiska = id_stanowiska";
    var table = ["etap_produkcji", "stanowisko"];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
      if (err) {
        res.json({"Error": true, "Message": "Error executing MySQL query"});
      } else {
        res.json({"Error": false, "Message": "Success", "productionStage": rows});
      }
    });
  });

  router.post("/newProductionStage",function (req,res){
    var query = "INSERT INTO ?? VALUES (null,?,?)";
    var table = ["etap_produkcji", req.body.stanowisko_id_stanowiska, req.body.nazwa_etapu];
    query = mysql.format(query, table);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Dodano nowy etap produkcji"});
      }
    });
  })
  router.post("/newProductConsumption",function (req,res){
    var query = "INSERT INTO ?? VALUES (?,?,?)";
    var table = ["zuzycie_polproduktow_na_produkt", req.body.Polprodukty_id_polproduktu, req.body.model_produktu_id_modelu, req.body.Zuzycie];
    query = mysql.format(query, table);
    console.log(req.body);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Dodano nową pozycję zużycia półproduktu na produkt"});
      }
    });
  })
  router.get("/product",function (req,res) {
    var query = "SELECT * FROM ??";
    var table = ["model_produktu"];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
      if (err) {
        res.json({"Error": true, "Message": "Error executing MySQL query"});
      } else {
        res.json({"Error": false, "Message": "Success", "product": rows});
      }
    });
  });
  router.get("/consumptionOfIntermediates",function (req,res) {
    var query = "SELECT model_produktu_id_modelu, Polprodukty_id_polproduktu, nazwa_modelu, nazwa_produktu, nazwa_polproduktu, Zuzycie FROM ??, ??, ??, ??  WHERE model_produktu_id_modelu = id_modelu AND Polprodukty_id_polproduktu = id_polproduktu AND produkt_id_produktu = id_produktu";
    var table = ["zuzycie_polproduktow_na_produkt", "polprodukty", "model_produktu", "produkt"];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
      if (err) {
        res.json({"Error": true, "Message": "Error executing MySQL query"});
      } else {
        res.json({"Error": false, "Message": "Success", "consumptionOfIntermediates": rows});
      }
    });
  });
  router.post("/deleteConsumptionOfIntermediates",function(req,res) {
    var query = "DELETE from ?? WHERE model_produktu_id_modelu = ? AND Polprodukty_id_polproduktu = ?";
    var table = ["zuzycie_polproduktow_na_produkt", req.body.model_produktu_id_modelu, req.body.Polprodukty_id_polproduktu];
    query = mysql.format(query,table);
    connection.query(query,function(err, rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Usunięto pozycję"});
      }
    });
  });
  router.post("/login",function(req,res){
    var query = "select Imie, Nazwisko, id_pracownika, Stanowisko from ?? where email=? AND haslo=?";
    var table = ["pracownik", req.body.email, req.body.haslo];
    query = mysql.format(query, table);
    connection.query(query,function(err,rows){
      if(err || !rows.length) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "user" : rows});
      }
    });
  });
  router.get("/users/:id",function(req,res){
    var query = "SELECT id_pracownika, Imie, Nazwisko, Stanowisko, email FROM pracownik WHERE ??=?";
    var table = ["id_pracownika",req.params.id];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "user" : rows});
      }
    });
  });
  router.get("/warehouse",function(req,res){
    var query = "SELECT id_produktu_magazynu, id_produkcji, data_godzina_wprowadzenia, stan_w_magazynie, etap_produkcji_id_etapu_produkcji, nazwa_etapu, zamowienie_id_zamowienie, filename, nazwa_produktu, model_produktu_id_modelu, nazwa_modelu, id_stanowiska, nazwa_maszyny, Imie, Nazwisko FROM ??, ??, ??, ??, ??, ??, ??, ??, ?? WHERE magazyn.produkcja_id_produkcji = produkcja.id_produkcji AND produkcja.etap_produkcji_id_etapu_produkcji = etap_produkcji.id_etapu_produkcji AND produkcja.przekazanie_zamowienia_do_produkcji_id_przekazania_zamowienia = przekazanie_zamowienia_do_produkcji.id_przekazania_zamowienia AND id_zamowienie = zamowienie_id_zamowienie AND zamowienie.produkt_id_produktu = produkt.id_produktu AND zamowienie.model_produktu_id_modelu = model_produktu.id_modelu AND stanowisko_id_stanowiska = id_stanowiska AND magazyn.pracownik_id_pracownika = pracownik.id_pracownika";
    var table = ["magazyn", "produkcja", "etap_produkcji", "przekazanie_zamowienia_do_produkcji", "zamowienie", "produkt", "model_produktu", "stanowisko", "pracownik"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
       if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "warehouse" : rows});
      }
    });
  });
  router.put("/warehouseTaking",function(req,res){
    var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
    var table = ["magazyn", "stan_w_magazynie", req.body.stan_w_magazynie, "pracownik_id_pracownika", req.body.pracownik_id_pracownika, "id_produktu_magazynu", req.body.id_produktu_magazynu];
    query = mysql.format(query, table);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Pobrano element do obróbki"});
      }
    });
  });
  router.put("/warehouseTakingAdd",function(req,res){
    var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
    var table = ["magazyn", "data_godzina_wprowadzenia", req.body.data_godzina_wprowadzenia, "stan_w_magazynie", req.body.stan_w_magazynie, "pracownik_id_pracownika", req.body.pracownik_id_pracownika, "id_produktu_magazynu", req.body.id_produktu_magazynu];
    query = mysql.format(query, table);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        var query2 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table2 = ["produkcja", "etap_produkcji_id_etapu_produkcji", req.body.etap_produkcji_id_etapu_produkcji, "id_produkcji", req.body.id_produkcji];
        query2 = mysql.format(query2, table2);
        connection.query(query2,function (err) {
          if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
            res.json({"Error" : false, "Message" : "Wstawiono element do magazynu"});
          }
        });
      }
    });
  });
  router.get("/productionResults",function(req,res){
    var query = "SELECT id_wynikow_produkcji, produkcja_id_produkcji, data_wyprodukowania, zamowienie_id_zamowienie, nazwa_produktu, ilosc_zamowienia, nazwa_produktu, nazwa_modelu, data_zamowienia, data_realizacji FROM ??, ??, ??, ??, ??, ?? WHERE produkcja_id_produkcji = id_produkcji AND produkcja.przekazanie_zamowienia_do_produkcji_id_przekazania_zamowienia = przekazanie_zamowienia_do_produkcji.id_przekazania_zamowienia AND zamowienie_id_zamowienie = id_zamowienie AND zamowienie.produkt_id_produktu = produkt.id_produktu AND zamowienie.model_produktu_id_modelu = model_produktu.id_modelu";
    var table = ["wyniki_produkcji", "zamowienie", "produkcja", "produkt", "przekazanie_zamowienia_do_produkcji", "model_produktu"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "productionResults" : rows});
      }
    });
  });
  router.post("/AddproductionResults",function(req,res){
    var query = "INSERT INTO ?? VALUES (null,?,?)";
    var table = ["wyniki_produkcji", req.body.produkcja_id_produkcji, req.body.data_wyprodukowania];
    query = mysql.format(query, table);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        var query2 = "DELETE from ?? WHERE ??=? AND ??=?";
        var table2 = ["magazyn", "produkcja_id_produkcji", req.body.produkcja_id_produkcji, "id_produktu_magazynu",req.body.id_produktu_magazynu];
        query2 = mysql.format(query2,table2);
        connection.query(query2,function(err,rows){
          if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
            res.json({"Error" : false, "Message" : "Usunięto element z magazynu"});
          }
        });
      }
    });
  });
  router.get("/products",function(req,res){
    var query = "SELECT * FROM ??";
    var table = ["produkt"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "products" : rows});
      }
    });
  });
  router.post("/newProduct",function (req,res){
    var query = "INSERT INTO ?? VALUES (null,?)";
    var table = ["produkt", req.body.nazwa_produktu];
    query = mysql.format(query, table);
    console.log(req.body);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Dodano nowy produkt"});
      }
    });
  })
  router.post("/newProductsModel",function (req,res){
    var query = "INSERT INTO ?? VALUES (null,?,?)";
    var table = ["model_produktu", req.body.produkt_id_produktu, req.body.nazwa_modelu];
    query = mysql.format(query, table);
    console.log(req.body);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Dodano nowy model produktu"});
      }
    });
  })
  router.get("/productsModel",function(req,res){
    var query = "SELECT id_modelu, produkt_id_produktu, nazwa_modelu, nazwa_produktu FROM ??, ?? WHERE produkt_id_produktu = id_produktu";
    var table = ["model_produktu", "produkt"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "productsModel" : rows});
      }
    });
  });
  router.get("/productTable",function(req,res){
    var query = "SELECT id_modelu, produkt_id_produktu, nazwa_modelu, nazwa_produktu FROM ??, ?? WHERE produkt_id_produktu = id_produktu AND nazwa_produktu = 'Stół'";
    var table = ["model_produktu", "produkt"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "productTable" : rows});
      }
    });
  });
  router.get("/productTab",function(req,res){
    var query = "SELECT id_modelu, produkt_id_produktu, nazwa_modelu, nazwa_produktu FROM ??, ?? WHERE produkt_id_produktu = id_produktu AND nazwa_produktu = 'Stolik'";
    var table = ["model_produktu", "produkt"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "productTab" : rows});
      }
    });
  });
  router.get("/transferOfTheOrder",function(req,res){
    var query = "SELECT id_przekazania_zamowienia, zamowienie_id_zamowienie, ilosc FROM ??";
    var table = ["przekazanie_zamowienia_do_produkcji"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "transferOfTheOrder" : rows});
      }
    });
  });
  router.put("/AddTransferOfTheOrder",function(req,res){
    var query = "INSERT INTO ?? VALUES (null,?,?)";
    var table = ["produkcja", req.body.przekazanie_zamowienia_do_produkcji_id_przekazania_zamowienia, req.body.etap_produkcji_id_etapu_produkcji];
    query = mysql.format(query, table);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        var query2 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table2 = ["przekazanie_zamowienia_do_produkcji", "ilosc", req.body.ilosc, "id_przekazania_zamowienia", req.body.id_przekazania_zamowienia];
        query2 = mysql.format(query2, table2);
        connection.query(query2,function (err) {
          if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
            connection.query('SELECT max(id_produkcji) as max from produkcja', function (err, rows) {
              var ret = JSON.parse(JSON.stringify(rows));
              id_przek = ret[0].max;
              var query3 = "INSERT INTO ?? VALUES (null,?,?,?,?)";
              var table3 = ["magazyn", id_przek, req.body.data_godzina_wprowadzenia, req.body.stan_w_magazynie, req.body.pracownik_id_pracownika];
              query3 = mysql.format(query3, table3);
              connection.query(query3, function (err) {
                if (err) {
                  res.json({"Error": true, "Message": "Error executing MySQL query"});
                } else {
                  res.json({"Error" : false, "Message" : "Wstawiono element do magazynu"});
                }
              });
            });
          }
        });
      }
    });
  });
  router.get("/theResultOfTheProductionOfTables",function(req,res){
    connection.query('SELECT nazwa_produktu, count(produkt_id_produktu) AS Ilosc_zamowien_produktu FROM zamowienie, produkt WHERE produkt.id_produktu=zamowienie.produkt_id_produktu GROUP BY nazwa_produktu ORDER BY Ilosc_zamowien_produktu DESC LIMIT 5',function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "data" : rows});
      }
    });
  });
  router.get("/theResultOfTheProductionOfModelTables",function(req,res){
    connection.query('SELECT nazwa_modelu, count(model_produktu_id_modelu) AS Ilosc_zamowien_modelu FROM zamowienie, model_produktu WHERE model_produktu.id_modelu=zamowienie.model_produktu_id_modelu AND model_produktu.produkt_id_produktu = 1 GROUP BY nazwa_modelu ORDER BY Ilosc_zamowien_modelu DESC LIMIT 5',function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "data" : rows});
      }
    });
  });
  router.get("/theResultOfTheProductionOfModelTable",function(req,res){
    connection.query('SELECT nazwa_modelu, count(ilosc_zamowienia) AS Ilosc_zamowien_modelu FROM zamowienie, model_produktu WHERE model_produktu.id_modelu=zamowienie.model_produktu_id_modelu AND model_produktu.produkt_id_produktu = 2 GROUP BY nazwa_modelu ORDER BY Ilosc_zamowien_modelu DESC LIMIT 5',function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "data" : rows});
      }
    });
  });
};


module.exports = REST_ROUTER;
