const moment = require('moment')

module.exports = {
    formatDate: (date, format)=>{
        return(moment(date).format(format))
    },

    transactionID: ()=>{
        const numbers = ()=>{
            const num = Math.floor(Math.random()*10);
            return(num);
        }
        
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
          }
        let Alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        
            
        const genTransactionId = ()=>{ 
            const Id =[];
        
            while (Id.length < 10){
                Id.push(numbers())
                let i = getRandomInt(0,26);
                Id.push(Alphabets[i]);
            }
            
            while(Id.length < 8){
                let i = getRandomInt(0,26);
                Id.push(Alphabets[i]);
        
        
        
            }
            const transactionId = Id.join('');
            
            return(transactionId);
        
        
        }
        return genTransactionId()
         
    }
}