import { Product } from "../types/Product";

export const productsMock: Product[] = [
    {
        id: 1,
        description: "Blend de carne(100G), Bacon super crocante, Cheddar cremoso, Molho especial, Alface e tomate tudo isso dentro de um delicioso Pão de Hamburguer",
        categoryName: "burguer",
        image: "/temp/smash.png",
        name: "Burguer Smash",
        price: 13.90,
        aditionals: [
        {
            id: 1,
            name: "blend de carne(100G) Extra",
            price: 3.00
        },
        {
            id: 2,
            name: "Queijo creddar Extra",
            price: 2.50
        },
        {
            id: 3,
            name: "molho especial Extra",
            price: 1.70
        },
        {
            id: 4,
            name: "molho de cheddar Extra",
            price: 2.00
        },
        {
            id: 5,
            name: "bacon crocante Extra",
            price: 3.00
        },
        {
            id: 6,
            name: "picles Extra",
            price: 1.20
        }
        ]
    },
    {
        id: 2,
        description: "Dois Blends de carne(100G), Bacon super crocante, Duas Camadas de Cheddar, Molho especial, Alface e tomate tudo isso dentro de um delicioso Pão de Hamburguer",
        categoryName: "burguer",
        image: "/temp/double-smash.png",
        name: "Double Smash",
        price: 19.90,
        aditionals: [
        {
            id: 1,
            name: "blend de carne(100G) Extra",
            price: 3.00
        },
        {
            id: 2,
            name: "Queijo creddar Extra",
            price: 2.50
        },
        {
            id: 3,
            name: "molho especial Extra",
            price: 1.70
        },
        {
            id: 4,
            name: "molho de cheddar Extra",
            price: 2.00
        },
        {
            id: 5,
            name: "bacon crocante Extra",
            price: 3.00
        },
        {
            id: 6,
            name: "picles Extra",
            price: 1.20
        }
        ]
    },
    {
        id: 3,
        description: "Blend de carne(150G), Bacon Hiper crocante, Cheddar cremoso, Molho especial, Alface e tudo isso dentro de um delicioso Pão de Hamburguer",
        categoryName: "burguer",
        image: "/temp/big-bacon.png",
        name: "Big Bacon",
        price: 18.90,
        aditionals: [
        {
            id: 1,
            name: "blend de carne(150G) Extra",
            price: 4.30
        },
        {
            id: 2,
            name: "Queijo creddar Extra",
            price: 2.50
        },
        {
            id: 3,
            name: "molho especial Extra",
            price: 1.70
        },
        {
            id: 4,
            name: "molho de cheddar Extra",
            price: 2.00
        },
        {
            id: 5,
            name: "bacon crocante Extra",
            price: 3.00
        },
        {
            id: 6,
            name: "picles Extra",
            price: 1.20
        }
        ]
    },
    {
        id: 4,
        description: "Blend de carne(150G), Bastante Bacon crocante, Cheddar cremoso, Molho especial de cheddar, Cebola Caramelizada e tudo isso dentro de um delicioso Pão de Hamburguer",
        categoryName: "burguer",
        image: "/temp/especial.png",
        name: "Especial da Casa",
        price: 21.90,
        aditionals: [
            {
                id: 1,
                name: "blend de carne(150G) Extra",
                price: 4.30
            },
            {
                id: 2,
                name: "Queijo creddar Extra",
                price: 2.50
            },
            {
                id: 3,
                name: "molho especial Extra",
                price: 1.70
            },
            {
                id: 4,
                name: "molho de cheddar Extra",
                price: 2.00
            },
            {
                id: 5,
                name: "bacon crocante Extra",
                price: 3.00
            },
            {
                id: 6,
                name: "picles Extra",
                price: 1.20
            }
            ]
    },
    {
        id: 5,
        description: "Creme de açaí, banana, leite em pó e xarope de guaraná",
        categoryName: "vitamina",
        image: "/temp/vitamina-acai.png",
        name: "Vitamina de açaí 550ml",
        price: 8.90
    },
    {
        id: 6,
        description: "Creme de açaí, banana, leite em pó e xarope de guaraná",
        categoryName: "vitamina",
        image: "/temp/vitamina-acai.png",
        name: "Vitamina de açaí 350ml",
        price: 6.90
    },
    {
        id: 7,
        description: "Creme de cupuaçú, leite em pó e xarope de guaraná",
        categoryName: "vitamina",
        image: "/temp/vitamina-cupuacu.png",
        name: "Vitamina de cupuaçú 550ml",
        price: 8.90
    },
    {
        id: 8,
        description: "Creme de cupuaçú, leite em pó e xarope de guaraná",
        categoryName: "vitamina",
        image: "/temp/vitamina-cupuacu.png",
        name: "Vitamina de cupuaçú 350ml",
        price: 6.90
    },
    {
        id: 9,
        description: "Creme de açaí, creme de cupuaçú, banana, leite em pó e xarope de guaraná",
        categoryName: "vitamina",
        image: "/temp/vitamina-acai.png",
        name: "Vitamina de açaí com cupuaçú 550ml",
        price: 8.90
    },
    {
        id: 10,
        description: "Creme de açaí, creme de cupuaçú, banana, leite em pó e xarope de guaraná",
        categoryName: "vitamina",
        image: "/temp/vitamina-acai.png",
        name: "Vitamina de açaí com cupuaçú 350ml",
        price: 6.90
    },
    {
        id: 11,
        image: "/temp/coca.png",
        categoryName: "bebida",
        name: "Coca-cola 350ml",
        price: 6.00
    },
    {
        id: 12,
        image: "/temp/fanta.png",
        categoryName: "bebida",
        name: "Fanta Laranja 350ml",
        price: 5.00
    },
    {
        id: 13,
        image: "/temp/soda.png",
        categoryName: "bebida",
        name: "soda 350ml",
        price: 5.00
    },
    {
        id: 14,
        image: "/temp/coca-mine.png",
        categoryName: "bebida",
        name: "Coca-cola 230ml",
        price: 4.50
    },
    {   
    id: 14,
    image: "/temp/eisenbahn.png",
    categoryName: "bebida",
    name: "eisenbahn long neck",
    price: 7.00,
    },
    {   
    id: 15,
    image: "/temp/budweiser.png",
    categoryName: "bebida",
    name: "budweiser long neck",
    price: 7.00,
    },
    {   
    id: 16,
    image: "/temp/combo-trio.png",
    categoryName: "combo",
    description: "Três Burguers(double smash, big bacon e especial da casa) + porção de molho especial extra + duas coca-colas lata",
    name: "Trio Da Madrugada",
    price: 57.90,
    },
    {   
    id: 17,
    image: "/temp/combo-festa.png",
    categoryName: "combo",
    name: "Festa do pijama",
    description: "Três Smashs Burguers + coca lata + vitamina de cupuaçú",
    price: 7.00,
    },
    {   
    id: 15,
    image: "/temp/combo-proibidao.png",
    categoryName: "combo",
    name: "Proibidão",
    description: "Dois Big Burguers + 2 budweiser long neck + porção de bacon extra",
    price: 7.00,
    },

];

