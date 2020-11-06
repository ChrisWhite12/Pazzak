import Card from "./cardmodel";

class Deck{
    constructor(){
        this.deck = this.create_deck();
        this.discard = [];
        this.shuffle_deck();
    }

    create_deck() {
        var rank = ['1','2','3','4','5','6','7','8','9','10']
        var val = [1,2,3,4,5,6,7,8,9,10];
        var temp_deck = []
        for (let i = 0; i < 4; i++) {
            rank.forEach(el1 => {
                //create card object
                var card1 = new Card();
                //add name
                card1.name = (el1+'-main')
                card1.rank = el1;
                card1.suit = 'main';
                card1.value = val[rank.indexOf(el1)];
                //add value
                temp_deck.push(card1);
            });
        }
        return temp_deck
    }

    //shuffle remaining deck and discard
    shuffle_deck() {
        var j, x, i, a;
        a = this.deck;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        this.deck = a;
    }

    drawcard(){
        var cardreturn = this.deck.shift();
        //console.log(`card return - ${cardreturn}`)

        //console.log(this.deck);
        if(this.deck.length < 1){
            
            this.discard.forEach(el => {this.deck.push(el)})
            //this.deck.push(this.discard);
            this.shuffle_deck();
            console.log('Deck Shuffle')
            //console.log(this.deck);
        }

        return cardreturn;
    }

}

export default Deck