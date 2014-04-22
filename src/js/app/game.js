define(["mithril"], function(m) {


    var game = {};

    game.Card = function(data) {
        this.name = m.prop(data.name);
        this.suit = m.prop(data.suit);
        this.value = m.prop(data.value);
    }

    game.Deck = function() {
        deck = [];
        var suits = ["Hearts","Clubs","Spades","Diamonds"];
        var names = ["2","3","4","5","6","7","8","9","10","Jack","Queen","King","Ace"];
        var values = [2,3,4,5,6,7,8,9,10,10,10,10,1];

        // get a full deck of cards
        for(i=0;i<4;i++) {
            for(j=0;j<13;j++) {
                cardSpec = {
                    suit: suits[i],
                    name: names[j],
                    value: values[j]
                }
                card = new game.Card(cardSpec);
                deck.push(card);

            }
        }

        return deck;
    }

    game.shuffle = function(deck) {
        shuffled = [];
        while(deck.length >0) {
            pos = Math.floor(Math.random() * deck.length);
            taken = deck.splice(pos,1);
            card = taken[0];
            console.log("Added: " + card.name() + " of " + card.suit());
            shuffled.push(taken[0]);
        }

        return shuffled;
    }

    game.draw = function(deck) {
        return deck.pop();
    }


    game.controller = function() {

        this.deck = game.shuffle(game.Deck());
        this.hand = [];
        this.total = 0;
        this.dealer = [];
        this.dealerTotal =0;

        this.reset = function() {
            this.deck = game.shuffle(game.Deck());
            this.hand = [];
            this.total = 0;
            this.dealer = [];
            this.dealerTotal =0;
        }

        this.twist = function() {
            drawn = this.deck.pop();
            this.hand.push(drawn);
            this.total += drawn.value();

            if(this.total == 21) {
                alert("Winner!");
            }

            if(this.total > 21) {
                alert("Loser!");
            }
        }

        this.stick = function() {
            // do the dealer's go
            while(this.dealerTotal < 15) {
                // dealer twists on anything below 15
                drawn = this.deck.pop();
                this.dealer.push(drawn);
                this.dealerTotal += drawn.value();
            }

            if(this.dealerTotal > 21 || this.dealerTotal < this.total) {
                alert("Winner!");
            } else {
                alert("Loser!");
            }
        }
    }


    game.view = function(ctrl) {

        return m("html", [
            m("body", [
                m("button", {onclick: ctrl.twist.bind(ctrl)}, "Twist"),
                m("button", {onclick: ctrl.stick.bind(ctrl)}, "Stick"),
                m("button", {onclick: ctrl.reset.bind(ctrl)}, "Reset"),
                m("h2","Hand"),
                m("p",[
                    m("strong","Total: "),
                    ctrl.total
                ]),
                m("table", [
                     ctrl.hand.map(function(card,index) {

                        return m("tr", [
                            m("td", card.suit()),
                            m("td", card.name()),
                        ])
                    })
                ]),
                m("h2","Dealer"),
                m("p",[
                    m("strong","Total: "),
                    ctrl.dealerTotal
                ]),
                m("table", [

                    ctrl.dealer.map(function(card,index) {

                        return m("tr", [
                            m("td", card.suit()),
                            m("td", card.name()),
                        ])
                    })
                ])
            ])
        ]);
    }

    game.init = function() {
        m.module(document,game);
    }



    // start the app
    game.init();
});
