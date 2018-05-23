var mysql   = require("mysql");
function REST_ROUTER(router,connection,md5) {
  var self = this;
  self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
  router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
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
    var query = "SELECT id_zamowienie, nazwa_produktu, pracownik_id_pracownika, nazwa_zamowienia, ilosc_zamowienia, data_zamowienia, data_realizacji FROM ??, ?? WHERE Produkt_id_produktu = id_produktu";
    var table = ["zamowienie","produkt"];
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
    var query = "INSERT INTO ?? VALUES (null,?,?,?,?,?,?)";
    var table = ["zamowienie", req.body.pracownik_id_pracownika, req.body.Produkt_id_produktu, req.body.nazwa_zamowienia, req.body.ilosc_zamowienia, req.body.data_zamowienia, req.body.data_realizacji];
    query = mysql.format(query, table);
    connection.query(query,function(err){
          if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
            connection.query('SELECT max(id_zamowienie) as max from zamowienie', function (err, rows) {
            var ret = JSON.parse(JSON.stringify(rows));
            id_zam = ret[0].max;
            var query2 = "INSERT INTO ?? VALUES (null,?,?,?)";
            var table2 = ["produkcja_stolu", req.body.etap_produkcji_id_etapu_produkcji, id_zam, req.body.proces_technologiczny];
            query2 = mysql.format(query2, table2);
            connection.query(query2, function (err) {
              if (err) {
                res.json({"Error": true, "Message": "Error executing MySQL query"});
              } else {
                connection.query('SELECT max(id_produkcji) as max from produkcja_stolu', function (err, rows) {
                  var ret = JSON.parse(JSON.stringify(rows));
                  id_prod = ret[0].max;
                  var query3 = "INSERT INTO ?? VALUES (null,?,?,?)";
                  var table3 = ["magazyn", id_prod, req.body.data_godzina_wprowadzenia, req.body.stan_w_magazynie];
                  query3 = mysql.format(query3, table3);
                  connection.query(query3, function (err) {
                    if (err) {
                      res.json({"Error": true, "Message": "Error executing MySQL query"});
                    } else {
                      var query4 = "SELECT Polprodukty_id_polproduktu, Zuzycie FROM ?? WHERE ?? = ?";
                      var table4 = ["zuzycie_polproduktow_na_produkt", "Produkt_id_produktu", req.body.Produkt_id_produktu];
                      query4 = mysql.format(query4,table4);
                      connection.query(query4,function(err, rows) {
                        if (err) {
                          res.json({"Error": true, "Message": "Error executing MySQL query"});
                        } else {
                          var values = [];
                          for ( var i = 0; i<rows.length; i++) {
                            var row = rows[i]['Zuzycie'];
                            var row2 = rows[i]['Polprodukty_id_polproduktu'];
                            values.push({
                              'Zuzycie': row,
                              'Polprodukty_id_polproduktu': row2
                            });
                            var query5 = "SELECT ilosc_polproduktu, stan_magazynu_polproduktu.Polprodukty_id_polproduktu, Zuzycie FROM ??, ?? WHERE ?? = ? AND ?? = ? AND ?? = ??";
                            var table5 = ['stan_magazynu_polproduktu', 'zuzycie_polproduktow_na_produkt', 'stan_magazynu_polproduktu.Polprodukty_id_polproduktu', rows[i]['Polprodukty_id_polproduktu'], "Produkt_id_produktu", req.body.Produkt_id_produktu, "zuzycie_polproduktow_na_produkt.Polprodukty_id_polproduktu", "stan_magazynu_polproduktu.Polprodukty_id_polproduktu"];
                            query5 = mysql.format(query5,table5);
                            connection.query(query5,function (err, rows2) {
                              if (err) {
                                res.json({"Error": true, "Message": "Error executing MySQL query"});
                              } else {
                                var values2 = [];
                                for (var j = 0; j<rows2.length; j++) {
                                  var query6 = "UPDATE ?? SET  ?? = ? WHERE ?? = ?";
                                  var table6 = ["stan_magazynu_polproduktu", "ilosc_polproduktu", rows2[j]['ilosc_polproduktu'] - rows2[j]['Zuzycie'], "Polprodukty_id_polproduktu", rows2[j]['Polprodukty_id_polproduktu']];
                                  query6 = mysql.format(query6, table6);
                                  connection.query(query6);
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
    var table = ["zuzycie_polproduktow_na_produkt", req.body.Polprodukty_id_polproduktu, req.body.Produkt_id_produktu, req.body.Zuzycie];
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
    var table = ["produkt"];
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
    var query = "SELECT Produkt_id_produktu, Polprodukty_id_polproduktu, nazwa_produktu, nazwa_polproduktu, Zuzycie FROM ??, ??, ?? WHERE Produkt_id_produktu = id_produktu AND Polprodukty_id_polproduktu = id_polproduktu";
    var table = ["zuzycie_polproduktow_na_produkt", "polprodukty", "produkt"];
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
    var query = "DELETE from ?? WHERE Produkt_id_produktu = ? AND Polprodukty_id_polproduktu = ?";
    var table = ["zuzycie_polproduktow_na_produkt", req.body.Produkt_id_produktu, req.body.Polprodukty_id_polproduktu];
    console.log(req.body);
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
    var query = "SELECT id_produktu_magazynu, produkcja_stolu_id_produkcji, id_stanowiska, Zamowienie_id_zamowienie, etap_produkcji_id_etapu_produkcji, data_godzina_wprowadzenia, stan_w_magazynie, nazwa_etapu, nazwa_maszyny, id_produkcji, nazwa_produktu, nazwa_zamowienia, proces_technologiczny FROM ??, ??, ??, ??, ??, ?? WHERE produkcja_stolu_id_produkcji = id_produkcji AND id_etapu_produkcji = etap_produkcji_id_etapu_produkcji AND id_stanowiska = stanowisko_id_stanowiska  AND id_produktu = Produkt_id_produktu AND id_zamowienie = Zamowienie_id_zamowienie";
    var table = ["magazyn", "produkcja_stolu", "etap_produkcji", "stanowisko", "produkt", "zamowienie"];
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
    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    var table = ["magazyn", "stan_w_magazynie", req.body.stan_w_magazynie, "id_produktu_magazynu", req.body.id_produktu_magazynu];
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
    var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
    var table = ["magazyn", "data_godzina_wprowadzenia", req.body.data_godzina_wprowadzenia, "stan_w_magazynie", req.body.stan_w_magazynie, "id_produktu_magazynu", req.body.id_produktu_magazynu];
    query = mysql.format(query, table);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        var query2 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table2 = ["produkcja_stolu", "etap_produkcji_id_etapu_produkcji", req.body.etap_produkcji_id_etapu_produkcji, "id_produkcji", req.body.id_produkcji];
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
    var query = "SELECT id_wynikow_produkcji, produkcja_stolu_id_produkcji, data_wyprodukowania, Zamowienie_id_zamowienie, nazwa_zamowienia, ilosc_zamowienia, nazwa_produktu, data_zamowienia, data_realizacji FROM ??, ??, ??, ?? WHERE produkcja_stolu_id_produkcji = id_produkcji AND Zamowienie_id_zamowienie = id_zamowienie AND Produkt_id_produktu = id_produktu";
    var table = ["wyniki_produkcji", "zamowienie", "produkcja_stolu", "produkt"];
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
    var table = ["wyniki_produkcji", req.body.produkcja_stolu_id_produkcji, req.body.data_wyprodukowania];
    query = mysql.format(query, table);
    connection.query(query,function(err){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        var query2 = "DELETE from ?? WHERE ??=? AND ??=?";
        var table2 = ["magazyn", "produkcja_stolu_id_produkcji", req.body.produkcja_stolu_id_produkcji, "id_produktu_magazynu",req.body.id_produktu_magazynu];
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
  router.get("/theResultOfTheProductionOfTables",function(req,res){
    connection.query('SELECT nazwa_produktu, count(Produkt_id_produktu) AS Ilosc_zamowien_modelu FROM zamowienie, produkt WHERE produkt.id_produktu=zamowienie.Produkt_id_produktu GROUP BY nazwa_produktu ORDER BY Ilosc_zamowien_modelu DESC LIMIT 5',function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "data" : rows});
      }
    });
  });
  router.get("/theResultOfTheProductionOfTablesInMay",function(req,res){
    connection.query('SELECT nazwa_produktu, data_wyprodukowania, count(id_wynikow_produkcji) AS Ilosc_wyprodukowanych_modeli FROM wyniki_produkcji, produkt, zamowienie, produkcja_stolu WHERE wyniki_produkcji.produkcja_stolu_id_produkcji=produkcja_stolu.id_produkcji AND produkt.id_produktu=zamowienie.Produkt_id_produktu AND produkcja_stolu.Zamowienie_id_zamowienie=zamowienie.id_zamowienie AND data_wyprodukowania>="2018-05-01" AND data_wyprodukowania<="2018-05-31" GROUP BY nazwa_produktu ORDER BY Ilosc_wyprodukowanych_modeli DESC LIMIT 5',function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
        res.json({"Error" : false, "Message" : "Success", "data" : rows});
      }
    });
  });
};


module.exports = REST_ROUTER;
