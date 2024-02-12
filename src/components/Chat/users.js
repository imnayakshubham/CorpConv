const userLists = [
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Cristian",
            "last": "Díaz"
        },
        "location": {
            "street": {
                "number": 5425,
                "name": "Continuación Jamaica"
            },
            "city": "Cuanajo",
            "state": "Oaxaca",
            "country": "Mexico",
            "postcode": 91530,
            "coordinates": {
                "latitude": "29.0855",
                "longitude": "-162.9415"
            },
            "timezone": {
                "offset": "-3:00",
                "description": "Brazil, Buenos Aires, Georgetown"
            }
        },
        "email": "cristian.diaz@example.com",
        "login": {
            "uuid": "3458739e-676f-49f3-9b20-60861082e422",
            "username": "blackbird452",
            "password": "redbone",
            "salt": "yCx7L8n2",
            "md5": "44a898816c60d659ff20793be6ac412e",
            "sha1": "bf3466d448afdce86d0eeecb60217f26fcb12281",
            "sha256": "5dbd3278bf6be441f20af783686af76969320024405c5a99f386becaa739dd70"
        },
        "dob": {
            "date": "1946-10-14T12:09:08.100Z",
            "age": 77
        },
        "registered": {
            "date": "2013-06-15T18:09:55.505Z",
            "age": 10
        },
        "phone": "(610) 519 2110",
        "cell": "(664) 214 9486",
        "id": {
            "name": "NSS",
            "value": "57 08 32 1255 3"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/43.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/43.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/43.jpg"
        },
        "nat": "MX"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Jacob",
            "last": "Kristensen"
        },
        "location": {
            "street": {
                "number": 8588,
                "name": "Tingvejen"
            },
            "city": "Roedovre",
            "state": "Midtjylland",
            "country": "Denmark",
            "postcode": 99895,
            "coordinates": {
                "latitude": "-79.4019",
                "longitude": "70.2849"
            },
            "timezone": {
                "offset": "+3:30",
                "description": "Tehran"
            }
        },
        "email": "jacob.kristensen@example.com",
        "login": {
            "uuid": "7417e7da-8b0d-4632-8986-41669dda6f7a",
            "username": "brownpanda322",
            "password": "marie1",
            "salt": "BP3R67ni",
            "md5": "0f81aa7067a89f3291ce5cad7cb7ee0a",
            "sha1": "ebfe429c61af1168d59ea248a308663d712ac441",
            "sha256": "cc9c1d483c18bb932508845ea10f687e4917b8df64c4f84370f3a3d885bc2a5c"
        },
        "dob": {
            "date": "1967-11-03T09:57:01.187Z",
            "age": 56
        },
        "registered": {
            "date": "2012-04-21T16:08:38.873Z",
            "age": 11
        },
        "phone": "90592302",
        "cell": "74028485",
        "id": {
            "name": "CPR",
            "value": "031167-2444"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/35.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/35.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/35.jpg"
        },
        "nat": "DK"
    },
    {
        "gender": "female",
        "name": {
            "title": "Miss",
            "first": "Thea",
            "last": "Jensen"
        },
        "location": {
            "street": {
                "number": 4797,
                "name": "Tværvej"
            },
            "city": "Ishoej",
            "state": "Danmark",
            "country": "Denmark",
            "postcode": 64650,
            "coordinates": {
                "latitude": "67.4549",
                "longitude": "74.7370"
            },
            "timezone": {
                "offset": "-4:00",
                "description": "Atlantic Time (Canada), Caracas, La Paz"
            }
        },
        "email": "thea.jensen@example.com",
        "login": {
            "uuid": "ef3293b3-685f-418f-b514-b704c7e84767",
            "username": "orangeostrich631",
            "password": "coolness",
            "salt": "PIZ2i7ic",
            "md5": "b199756b0dca10f11fec9c49ae948d8e",
            "sha1": "4b7865424751557a22ed605d5f54f1678ede127f",
            "sha256": "f5562561c7430c9bde94bd06146d793dcf4696fbfa7d3327c369717f060f52ed"
        },
        "dob": {
            "date": "1977-03-24T21:38:41.319Z",
            "age": 46
        },
        "registered": {
            "date": "2004-05-30T21:59:44.743Z",
            "age": 19
        },
        "phone": "50783017",
        "cell": "68757452",
        "id": {
            "name": "CPR",
            "value": "240377-8416"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/23.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/23.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/23.jpg"
        },
        "nat": "DK"
    },
    {
        "gender": "female",
        "name": {
            "title": "Miss",
            "first": "Signe",
            "last": "Jørgensen"
        },
        "location": {
            "street": {
                "number": 7790,
                "name": "Bjerregårdsvej"
            },
            "city": "Brondby",
            "state": "Sjælland",
            "country": "Denmark",
            "postcode": 12082,
            "coordinates": {
                "latitude": "-40.4490",
                "longitude": "19.1941"
            },
            "timezone": {
                "offset": "0:00",
                "description": "Western Europe Time, London, Lisbon, Casablanca"
            }
        },
        "email": "signe.jorgensen@example.com",
        "login": {
            "uuid": "f3047e51-9a8d-4d2f-a048-a991381be401",
            "username": "smallladybug212",
            "password": "choochoo",
            "salt": "AQSP8sXK",
            "md5": "a2e2ca0668af1573e683ecb401bf97c4",
            "sha1": "f85fa44350e577413d8ac86b0dfe7b4209e7b4ee",
            "sha256": "d97aa4cf41b6a15e8ed7c874d59d86ac03556f23f86e7c263cf1a432353cad0e"
        },
        "dob": {
            "date": "1960-12-09T09:41:01.262Z",
            "age": 63
        },
        "registered": {
            "date": "2006-06-24T17:22:47.471Z",
            "age": 17
        },
        "phone": "37809405",
        "cell": "16375605",
        "id": {
            "name": "CPR",
            "value": "091260-1415"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/50.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/50.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/50.jpg"
        },
        "nat": "DK"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Valdo",
            "last": "Caldeira"
        },
        "location": {
            "street": {
                "number": 7027,
                "name": "Rua Vinte de Setembro"
            },
            "city": "Taboão da Serra",
            "state": "Santa Catarina",
            "country": "Brazil",
            "postcode": 96209,
            "coordinates": {
                "latitude": "53.7851",
                "longitude": "71.5748"
            },
            "timezone": {
                "offset": "+1:00",
                "description": "Brussels, Copenhagen, Madrid, Paris"
            }
        },
        "email": "valdo.caldeira@example.com",
        "login": {
            "uuid": "dc8c783d-61b4-49d5-97c0-2b06abaf4c93",
            "username": "angryleopard318",
            "password": "cassandr",
            "salt": "cRA7lAEl",
            "md5": "4936fa0b13ccd0d091b681a9dbf47518",
            "sha1": "f606b34853fb4125d6e2274cc9319de1fab4ffd3",
            "sha256": "c7fdce5d9e5facf6dfca1a2ccf09af3dac7ed24804e161956da0c425c551e0e4"
        },
        "dob": {
            "date": "1975-01-16T01:42:41.297Z",
            "age": 48
        },
        "registered": {
            "date": "2022-05-12T17:12:54.193Z",
            "age": 1
        },
        "phone": "(41) 3964-2435",
        "cell": "(18) 0846-2783",
        "id": {
            "name": "CPF",
            "value": "583.415.380-75"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/43.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/43.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/43.jpg"
        },
        "nat": "BR"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Gaël",
            "last": "Deschamps"
        },
        "location": {
            "street": {
                "number": 5894,
                "name": "Rue Louis-Garrand"
            },
            "city": "Reims",
            "state": "Lozère",
            "country": "France",
            "postcode": 77372,
            "coordinates": {
                "latitude": "52.4299",
                "longitude": "-12.8329"
            },
            "timezone": {
                "offset": "+5:45",
                "description": "Kathmandu"
            }
        },
        "email": "gael.deschamps@example.com",
        "login": {
            "uuid": "24385bd0-f718-42a6-88a1-8272910e17be",
            "username": "yellowfish111",
            "password": "420247",
            "salt": "GtKF3Y3L",
            "md5": "af1f655b572d7ad327b8b7a6a882a2ca",
            "sha1": "eb446165e5f1c32cb58bca27a3b272c4136c2cad",
            "sha256": "2fec1328a49a2c4b820077781153ab717f2fda34bd085dab67778ff8ea1b9b14"
        },
        "dob": {
            "date": "1952-01-28T13:29:02.886Z",
            "age": 71
        },
        "registered": {
            "date": "2008-02-23T03:33:19.549Z",
            "age": 15
        },
        "phone": "05-25-90-08-54",
        "cell": "06-03-18-79-27",
        "id": {
            "name": "INSEE",
            "value": "1520077550754 88"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/8.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/8.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/8.jpg"
        },
        "nat": "FR"
    },
    {
        "gender": "female",
        "name": {
            "title": "Madame",
            "first": "Paulina",
            "last": "Vidal"
        },
        "location": {
            "street": {
                "number": 9336,
                "name": "Rue Chazière"
            },
            "city": "Agarn",
            "state": "Jura",
            "country": "Switzerland",
            "postcode": 7725,
            "coordinates": {
                "latitude": "71.2381",
                "longitude": "129.9465"
            },
            "timezone": {
                "offset": "+11:00",
                "description": "Magadan, Solomon Islands, New Caledonia"
            }
        },
        "email": "paulina.vidal@example.com",
        "login": {
            "uuid": "f0b6f367-2308-438f-a625-fa646682d1d7",
            "username": "bluebear115",
            "password": "randall",
            "salt": "EFWIfQqy",
            "md5": "1a1db942bcbfcba4e39ba1568567f772",
            "sha1": "f7a9d86e2e9d3b50b01ff189ddc8291776425a56",
            "sha256": "9de300bb6a5c214ca9087f38e6393fc9d210eea3620f3bc26f8edda8e5edf685"
        },
        "dob": {
            "date": "1986-11-20T11:19:18.066Z",
            "age": 37
        },
        "registered": {
            "date": "2009-01-16T09:54:37.024Z",
            "age": 14
        },
        "phone": "077 505 28 18",
        "cell": "079 892 57 67",
        "id": {
            "name": "AVS",
            "value": "756.3247.3439.18"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/21.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/21.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/21.jpg"
        },
        "nat": "CH"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Hunter",
            "last": "Chow"
        },
        "location": {
            "street": {
                "number": 3458,
                "name": "Stanley Way"
            },
            "city": "Grand Falls",
            "state": "Alberta",
            "country": "Canada",
            "postcode": "B1J 7X0",
            "coordinates": {
                "latitude": "28.3812",
                "longitude": "-91.2712"
            },
            "timezone": {
                "offset": "+9:30",
                "description": "Adelaide, Darwin"
            }
        },
        "email": "hunter.chow@example.com",
        "login": {
            "uuid": "ce58d572-85d1-4c86-853b-9eb9b8498ece",
            "username": "angrymouse351",
            "password": "kimball",
            "salt": "GSnLWouY",
            "md5": "abdb39de86cac6d22c1fce308faf7cad",
            "sha1": "eab90256232071eb0dc984fad16e76bbbdcdd83b",
            "sha256": "2daf985e7c0c45c96dcd27373dc071dac4da194c9a152c139e7dc0397404d2b9"
        },
        "dob": {
            "date": "1988-02-02T04:56:46.526Z",
            "age": 35
        },
        "registered": {
            "date": "2021-12-28T03:10:15.151Z",
            "age": 2
        },
        "phone": "Q35 V17-3439",
        "cell": "J66 Y81-9834",
        "id": {
            "name": "SIN",
            "value": "477923502"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/68.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/68.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/68.jpg"
        },
        "nat": "CA"
    },
    {
        "gender": "female",
        "name": {
            "title": "Mrs",
            "first": "Isabell",
            "last": "Fotland"
        },
        "location": {
            "street": {
                "number": 8410,
                "name": "Ammerudhellinga"
            },
            "city": "Volda",
            "state": "Nordland",
            "country": "Norway",
            "postcode": "3713",
            "coordinates": {
                "latitude": "18.5845",
                "longitude": "-163.9066"
            },
            "timezone": {
                "offset": "-6:00",
                "description": "Central Time (US & Canada), Mexico City"
            }
        },
        "email": "isabell.fotland@example.com",
        "login": {
            "uuid": "f40241e4-8f11-4d97-851d-ce4ccb881b87",
            "username": "sadpanda771",
            "password": "mike1",
            "salt": "jpmzBfEo",
            "md5": "e06fbc1cfd327f40da44febb9d52b117",
            "sha1": "b92aaf31006f7bf35a37bc0f4ce378b5fa18ebec",
            "sha256": "47ce6b4eb8b52e6213ee6ec4f5f17fc49902f8ca6e751ed0e7d24c1c1adcb414"
        },
        "dob": {
            "date": "1992-02-20T22:05:47.425Z",
            "age": 31
        },
        "registered": {
            "date": "2013-12-08T05:37:06.341Z",
            "age": 10
        },
        "phone": "36560766",
        "cell": "98028200",
        "id": {
            "name": "FN",
            "value": "20029234451"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/23.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/23.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/23.jpg"
        },
        "nat": "NO"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Maximilian",
            "last": "Aspelund"
        },
        "location": {
            "street": {
                "number": 4922,
                "name": "Vestgrensa"
            },
            "city": "Rødberg",
            "state": "Buskerud",
            "country": "Norway",
            "postcode": "2421",
            "coordinates": {
                "latitude": "-55.7790",
                "longitude": "118.4134"
            },
            "timezone": {
                "offset": "-1:00",
                "description": "Azores, Cape Verde Islands"
            }
        },
        "email": "maximilian.aspelund@example.com",
        "login": {
            "uuid": "cf1fe706-a78c-481a-86b2-00b53bb68184",
            "username": "whitepeacock978",
            "password": "goblue",
            "salt": "9owHhh22",
            "md5": "6c33058b0e9c696f35141673842dd330",
            "sha1": "e689d3f8f7e011e04d0431828917f606f271a2c0",
            "sha256": "aca3583f01ea415165b347f08a188d34af638aa8b703cdfaf0ad99915dab7f2c"
        },
        "dob": {
            "date": "1951-10-28T08:27:36.903Z",
            "age": 72
        },
        "registered": {
            "date": "2005-10-04T19:02:57.919Z",
            "age": 18
        },
        "phone": "57317903",
        "cell": "44043081",
        "id": {
            "name": "FN",
            "value": "28105129302"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/27.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/27.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/27.jpg"
        },
        "nat": "NO"
    },
    {
        "gender": "female",
        "name": {
            "title": "Miss",
            "first": "یاسمین",
            "last": "حیدری"
        },
        "location": {
            "street": {
                "number": 2654,
                "name": "آیت الله سعیدی"
            },
            "city": "همدان",
            "state": "کرمانشاه",
            "country": "Iran",
            "postcode": 13075,
            "coordinates": {
                "latitude": "57.1074",
                "longitude": "-131.3905"
            },
            "timezone": {
                "offset": "-8:00",
                "description": "Pacific Time (US & Canada)"
            }
        },
        "email": "ysmyn.hydry@example.com",
        "login": {
            "uuid": "cddf39ba-b547-4c66-ae2e-1262e5e60b8b",
            "username": "brownrabbit623",
            "password": "lkjh",
            "salt": "sSKi8pkT",
            "md5": "345e1718a61175ba778a2bfae1a05bb4",
            "sha1": "af23e1760fb980241f5aabcc93cdf71d080ad59a",
            "sha256": "6967bb29312463e5ff278b7d6f345ae2186d030f080720d7214126ab5ffd3624"
        },
        "dob": {
            "date": "1989-07-17T07:45:59.534Z",
            "age": 34
        },
        "registered": {
            "date": "2010-10-21T05:59:34.617Z",
            "age": 13
        },
        "phone": "034-51342786",
        "cell": "0955-050-8026",
        "id": {
            "name": "",
            "value": null
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/69.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/69.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/69.jpg"
        },
        "nat": "IR"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "كيان",
            "last": "کامروا"
        },
        "location": {
            "street": {
                "number": 2102,
                "name": "مجاهدین اسلام"
            },
            "city": "قم",
            "state": "کرمانشاه",
            "country": "Iran",
            "postcode": 85401,
            "coordinates": {
                "latitude": "-50.2039",
                "longitude": "37.6255"
            },
            "timezone": {
                "offset": "+8:00",
                "description": "Beijing, Perth, Singapore, Hong Kong"
            }
        },
        "email": "kyn.khmrw@example.com",
        "login": {
            "uuid": "c35d80a4-cfaa-458d-ab66-4e5aaee2ed57",
            "username": "silvermeercat904",
            "password": "manowar",
            "salt": "tDozIMD8",
            "md5": "e3b241de232b60df041f032cf21f5c04",
            "sha1": "00bedf2308af68822d92180783cbf80883213750",
            "sha256": "cd9ad66e62b5aca139fd52ce775d761479c78ecccaf7591264c2b5962eb49146"
        },
        "dob": {
            "date": "1956-02-16T02:07:48.372Z",
            "age": 67
        },
        "registered": {
            "date": "2003-08-29T22:59:39.542Z",
            "age": 20
        },
        "phone": "039-43584458",
        "cell": "0963-494-2933",
        "id": {
            "name": "",
            "value": null
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/9.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/9.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/9.jpg"
        },
        "nat": "IR"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Nick",
            "last": "Thompson"
        },
        "location": {
            "street": {
                "number": 1959,
                "name": "Rookery Road"
            },
            "city": "Kildare",
            "state": "Dublin City",
            "country": "Ireland",
            "postcode": 25179,
            "coordinates": {
                "latitude": "-11.8584",
                "longitude": "-40.0078"
            },
            "timezone": {
                "offset": "+2:00",
                "description": "Kaliningrad, South Africa"
            }
        },
        "email": "nick.thompson@example.com",
        "login": {
            "uuid": "ec9ac896-a895-47c1-a97f-0200aa413afd",
            "username": "bluelion420",
            "password": "646464",
            "salt": "y2f7Ybfz",
            "md5": "3e6dadf9815a4444c911d5bf97eac8f9",
            "sha1": "7ca6ffffbcb38d60bb288f3786676b3905a9548e",
            "sha256": "e6bbbcc7c2e2320e838a3dabd9e6d51a98c215d92c2b7e14b1413ca5115cfb5a"
        },
        "dob": {
            "date": "1979-12-07T08:24:27.983Z",
            "age": 44
        },
        "registered": {
            "date": "2019-09-22T11:19:42.913Z",
            "age": 4
        },
        "phone": "041-731-3774",
        "cell": "081-332-3221",
        "id": {
            "name": "PPS",
            "value": "0357027T"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/38.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/38.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/38.jpg"
        },
        "nat": "IE"
    },
    {
        "gender": "female",
        "name": {
            "title": "Miss",
            "first": "Millie",
            "last": "Hall"
        },
        "location": {
            "street": {
                "number": 2931,
                "name": "Victoria Street"
            },
            "city": "Timaru",
            "state": "Manawatu-Wanganui",
            "country": "New Zealand",
            "postcode": 85248,
            "coordinates": {
                "latitude": "34.0869",
                "longitude": "178.7739"
            },
            "timezone": {
                "offset": "+4:30",
                "description": "Kabul"
            }
        },
        "email": "millie.hall@example.com",
        "login": {
            "uuid": "595c972b-e75f-4880-8e1f-1c8656afd239",
            "username": "organicfish478",
            "password": "marvel",
            "salt": "mZxxMWvt",
            "md5": "df0559733d73b2d155f7245b516c95e4",
            "sha1": "0f0b95190634bbee57ffce1fbe4613ba0aa6acce",
            "sha256": "2375abf343e593ff0e16d2065a00fea1a087fa03f115286201c231d1393863aa"
        },
        "dob": {
            "date": "1952-09-11T13:03:31.795Z",
            "age": 71
        },
        "registered": {
            "date": "2018-01-23T06:14:47.208Z",
            "age": 5
        },
        "phone": "(310)-359-2084",
        "cell": "(715)-564-0850",
        "id": {
            "name": "",
            "value": null
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/57.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/57.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/57.jpg"
        },
        "nat": "NZ"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Alfredo",
            "last": "Moreno"
        },
        "location": {
            "street": {
                "number": 2147,
                "name": "Paseo de Extremadura"
            },
            "city": "Torrejón de Ardoz",
            "state": "Castilla y León",
            "country": "Spain",
            "postcode": 47675,
            "coordinates": {
                "latitude": "6.3192",
                "longitude": "-94.9052"
            },
            "timezone": {
                "offset": "+8:00",
                "description": "Beijing, Perth, Singapore, Hong Kong"
            }
        },
        "email": "alfredo.moreno@example.com",
        "login": {
            "uuid": "a8264fab-4fe4-418e-ae22-1e06bbe35814",
            "username": "purpletiger537",
            "password": "stop",
            "salt": "KrFsYPa2",
            "md5": "3a0cf43dc55233a083faea09e4cc1473",
            "sha1": "191b41d33e83cb39a426899201781754f1c08cbb",
            "sha256": "16aca11901530b1971fd0fb70b0577317542e9af815abb342ca0a5f770255b19"
        },
        "dob": {
            "date": "1946-02-28T23:33:08.604Z",
            "age": 77
        },
        "registered": {
            "date": "2004-08-26T18:32:27.670Z",
            "age": 19
        },
        "phone": "906-244-381",
        "cell": "695-073-844",
        "id": {
            "name": "DNI",
            "value": "67335660-A"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/1.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/1.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/1.jpg"
        },
        "nat": "ES"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Leo",
            "last": "Peixoto"
        },
        "location": {
            "street": {
                "number": 9891,
                "name": "Rua Espirito Santo "
            },
            "city": "Valparaíso de Goiás",
            "state": "Pernambuco",
            "country": "Brazil",
            "postcode": 42111,
            "coordinates": {
                "latitude": "-76.1600",
                "longitude": "-121.2459"
            },
            "timezone": {
                "offset": "-8:00",
                "description": "Pacific Time (US & Canada)"
            }
        },
        "email": "leo.peixoto@example.com",
        "login": {
            "uuid": "5be1be63-53d0-4f77-a436-71739bbbd933",
            "username": "happyduck505",
            "password": "bowman",
            "salt": "zVhVOFoI",
            "md5": "90e6ccd6b3d0407790740c73a29fb7de",
            "sha1": "0b5168baa74a698d92ad9e112d75037223690a5b",
            "sha256": "9612ca8c4f85e08de4f39722f3582a5d9ed99773caf7d24e2b43519548262ba3"
        },
        "dob": {
            "date": "1981-05-16T00:22:52.887Z",
            "age": 42
        },
        "registered": {
            "date": "2013-11-27T09:13:56.066Z",
            "age": 10
        },
        "phone": "(89) 2503-2142",
        "cell": "(20) 4323-5791",
        "id": {
            "name": "CPF",
            "value": "120.873.328-09"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/40.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/40.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/40.jpg"
        },
        "nat": "BR"
    },
    {
        "gender": "female",
        "name": {
            "title": "Miss",
            "first": "Sharon",
            "last": "Diaz"
        },
        "location": {
            "street": {
                "number": 5531,
                "name": "High Street"
            },
            "city": "Stirling",
            "state": "South Yorkshire",
            "country": "United Kingdom",
            "postcode": "EC18 5XL",
            "coordinates": {
                "latitude": "27.3849",
                "longitude": "12.6787"
            },
            "timezone": {
                "offset": "-8:00",
                "description": "Pacific Time (US & Canada)"
            }
        },
        "email": "sharon.diaz@example.com",
        "login": {
            "uuid": "b1ba99d0-3d30-4046-b4a0-67fa23f35811",
            "username": "purplemouse260",
            "password": "pinhead",
            "salt": "jD6IFWLX",
            "md5": "a932b32f80bfcd9e5b25879de639e5a6",
            "sha1": "47ed091a50c16bb587834c63d8761df458fe8cc6",
            "sha256": "dba7b7cea0eb8ad4c5de5b55254b1906242f370d7a8ac9fec7066d542186659e"
        },
        "dob": {
            "date": "1966-08-31T19:51:53.110Z",
            "age": 57
        },
        "registered": {
            "date": "2015-04-11T21:53:49.328Z",
            "age": 8
        },
        "phone": "021 5276 9319",
        "cell": "07973 467973",
        "id": {
            "name": "NINO",
            "value": "HM 07 10 42 G"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/74.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/74.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/74.jpg"
        },
        "nat": "GB"
    },
    {
        "gender": "female",
        "name": {
            "title": "Miss",
            "first": "Klaudia",
            "last": "Kuck"
        },
        "location": {
            "street": {
                "number": 3274,
                "name": "Raiffeisenstraße"
            },
            "city": "Münnerstadt",
            "state": "Baden-Württemberg",
            "country": "Germany",
            "postcode": 18398,
            "coordinates": {
                "latitude": "64.4276",
                "longitude": "130.3591"
            },
            "timezone": {
                "offset": "-9:00",
                "description": "Alaska"
            }
        },
        "email": "klaudia.kuck@example.com",
        "login": {
            "uuid": "6ebf2246-b52b-4f06-8707-41d2649df242",
            "username": "whiteduck372",
            "password": "krypton",
            "salt": "oQIlVOQp",
            "md5": "f63ee6d3b015f921ba7d9d6d4f542346",
            "sha1": "b40ef415f695071e11d2e682fbdb4ddd81a92a92",
            "sha256": "898e8b6bfc004d835ed421b416ff73367c558e268924ae5e29b521071cb9fa87"
        },
        "dob": {
            "date": "1969-02-19T15:37:25.580Z",
            "age": 54
        },
        "registered": {
            "date": "2010-05-14T09:10:41.247Z",
            "age": 13
        },
        "phone": "0694-8232193",
        "cell": "0171-4106845",
        "id": {
            "name": "SVNR",
            "value": "81 190269 K 642"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/83.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/83.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/83.jpg"
        },
        "nat": "DE"
    },
    {
        "gender": "female",
        "name": {
            "title": "Miss",
            "first": "Ava",
            "last": "Tremblay"
        },
        "location": {
            "street": {
                "number": 1171,
                "name": "Dufferin St"
            },
            "city": "Stirling",
            "state": "New Brunswick",
            "country": "Canada",
            "postcode": "T6S 6A2",
            "coordinates": {
                "latitude": "-42.2372",
                "longitude": "-163.7765"
            },
            "timezone": {
                "offset": "+6:00",
                "description": "Almaty, Dhaka, Colombo"
            }
        },
        "email": "ava.tremblay@example.com",
        "login": {
            "uuid": "cd04b92f-32b8-43c9-86b6-782463cda881",
            "username": "silverrabbit978",
            "password": "mollydog",
            "salt": "Whn9YQAA",
            "md5": "ff142914165feab6aee9c57626ead1b4",
            "sha1": "a106fec4c66c730832cfec2ffc2882e9d7a5028f",
            "sha256": "49c5d4cda00d842f12582b8786916569a13f20c0ee9d57162e86dabfa8522db9"
        },
        "dob": {
            "date": "1975-04-01T19:52:05.866Z",
            "age": 48
        },
        "registered": {
            "date": "2014-10-12T13:18:49.419Z",
            "age": 9
        },
        "phone": "N00 N21-5274",
        "cell": "X91 M75-2795",
        "id": {
            "name": "SIN",
            "value": "330671777"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/38.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/38.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/38.jpg"
        },
        "nat": "CA"
    },
    {
        "gender": "female",
        "name": {
            "title": "Ms",
            "first": "Meral",
            "last": "Örge"
        },
        "location": {
            "street": {
                "number": 6284,
                "name": "Mevlana Cd"
            },
            "city": "Kırşehir",
            "state": "Burdur",
            "country": "Turkey",
            "postcode": 48840,
            "coordinates": {
                "latitude": "7.8752",
                "longitude": "-157.1772"
            },
            "timezone": {
                "offset": "+5:00",
                "description": "Ekaterinburg, Islamabad, Karachi, Tashkent"
            }
        },
        "email": "meral.orge@example.com",
        "login": {
            "uuid": "d03a91ad-d39b-4dd5-b368-97f9c9e3115f",
            "username": "happypanda915",
            "password": "panda",
            "salt": "g8GOdR1T",
            "md5": "8fc5c86f08b9083f89fd33d139b264da",
            "sha1": "43f5061ceb3d812f68dac5aba4e6ea5e52658a25",
            "sha256": "a63ea60ff00cb822b4c7dcefa0150d78221000ed263911622856416135e94bdf"
        },
        "dob": {
            "date": "1968-01-24T23:54:03.583Z",
            "age": 55
        },
        "registered": {
            "date": "2005-05-18T15:59:31.765Z",
            "age": 18
        },
        "phone": "(055)-181-5319",
        "cell": "(536)-220-5238",
        "id": {
            "name": "",
            "value": null
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/48.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/48.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/48.jpg"
        },
        "nat": "TR"
    }
]

const currentUser = {
    "gender": "male",
    "name": {
        "title": "Mr",
        "first": "Deniz",
        "last": "Toraman"
    },
    "location": {
        "street": {
            "number": 7834,
            "name": "Doktorlar Cd"
        },
        "city": "Giresun",
        "state": "Antalya",
        "country": "Turkey",
        "postcode": 81437,
        "coordinates": {
            "latitude": "67.1357",
            "longitude": "-113.0642"
        },
        "timezone": {
            "offset": "-10:00",
            "description": "Hawaii"
        }
    },
    "email": "deniz.toraman@example.com",
    "login": {
        "uuid": "3c1c251c-4faa-4ac3-b8a9-c061eb037219",
        "username": "redmeercat809",
        "password": "ladyboy",
        "salt": "q0QNNYol",
        "md5": "88496e011877931ba270e8a9281fa713",
        "sha1": "1acb6458a5895aabdba3b056d032f1b56d265812",
        "sha256": "9f72dab89867e9b9e28e55e408f2ce4c1a6eda66f5f506de14915be4f25e9d3e"
    },
    "dob": {
        "date": "1947-12-19T14:29:10.059Z",
        "age": 76
    },
    "registered": {
        "date": "2010-06-09T09:51:39.685Z",
        "age": 13
    },
    "phone": "(970)-241-1514",
    "cell": "(629)-181-3733",
    "id": {
        "name": "",
        "value": null
    },
    "picture": {
        "large": "https://randomuser.me/api/portraits/men/7.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/7.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/7.jpg"
    },
    "nat": "TR"
}

export { currentUser, userLists }