#!/usr/bin/mongo

var db = new Mongo().getDB("mapsdb");

db.mapsdb.remove({});

db.mapsdb.insert([
    { lat: 15.9910177, lng: 108.1443488 , title :' Nhà cho thuê' , price : '1.500.000' },
    { lat: 15.9710189, lng: 108.2293462 , title :' Nhà Nguyên Căn' , price : '3.000.000'},
    { lat: 15.9710122, lng: 108.2413461 , title :' Nhà Trọ Chung Chủ' , price : '4.500.000'},
    { lat: 15.9720182, lng: 108.2453463 , title :' Nhà cấp 4' , price : '2.500.000'},
    { lat: 15.9730185, lng: 108.2433464 , title :' Phòng Nữ ở Ghép' , price : '1.100.000'},
    { lat: 15.9714188, lng: 108.2423462 , title :' Cho thuê Nhà Trọ' , price : '1.300.000'},
    { lat: 15.9716182, lng: 108.2413463 , title :' Nhà Hai Lầu' , price : '1.400.000'},
    { lat: 15.9718189, lng: 108.2495663 , title :' Phòng Trọ Trẻ em' , price : '1.000.000'}

]);