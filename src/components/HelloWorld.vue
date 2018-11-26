<script>
export default {
  data(){
    return {
      calculator: {
        previous: null,
        current: '',
        operator: null,
        operatorClicked: false,
        sign: '',
        end: false
      }
    }
  },
  methods: {
    clearAll() {
      this.calculator.current = ''
    },
    sign() {
      if(this.calculator.current != '')
        this.calculator.current = this.calculator.current.charAt(0) === '-' ?
          this.calculator.current.slice(1) : `-${this.calculator.current}`
    },
    percent() {
      this.calculator.current = `${parseFloat(this.calculator.current) / 100}`
    },
    append(number) {
      if(number == '0' && this.calculator.current == '')
        this.calculator.current = ''
      else {
        if(this.calculator.operatorClicked) {
          this.calculator.current = ''
          this.calculator.operatorClicked = false
        }
        this.calculator.current = `${this.calculator.current}${number}`
      }
    },
    dot() {
      if (this.calculator.current.indexOf('.') === -1)
        this.append('.')
    },
    setPrevious() {
      this.calculator.previous = this.calculator.current
      this.calculator.operatorClicked = true;
    },
    divide() {
      this.calculator.operator = (a, b) => a / b
      this.setPrevious()
      this.calculator.sign = '÷'
    },
    times() {
      this.calculator.operator = (a, b) => a * b
      this.setPrevious()
      this.calculator.sign = 'x'
    },
    minus() {
      this.calculator.operator = (a, b) => a - b
      this.setPrevious()
      this.calculator.sign = '-'
    },
    add() {
      this.calculator.operator = (a, b) => a + b
      this.setPrevious()
      this.calculator.sign = '+'
    },
    equal() {
      this.calculator.current = this.calculator.operator(
        parseFloat(this.calculator.previous),
        parseFloat(this.calculator.current)
      )
      this.calculator.previous = null
      this.calculator.sign = ''
      this.calculator.end = true
    },
    del() {
      if(this.calculator.current)
        this.calculator.current = this.calculator.current.slice(0, -1)
    },
    sqrt() {
      if(parseFloat(this.calculator.current) >= 0)
        this.calculator.current = Math.sqrt(parseFloat(this.calculator.current))
    },
    pow() {
      this.calculator.current = Math.pow(parseFloat(this.calculator.current),2)
    },
    inverse() {
      if(parseFloat(this.calculator.current) > 0)
        this.calculator.current = 1 / parseFloat(this.calculator.current)
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="div">
      <h2>Shortcuts</h2>
      <ul>
        <li>Ctrl + 1   --> sqaure root</li>
        <li>Ctrl + 2   --> inverse</li>
        <li>Ctrl + 5   --> percent</li>
        <li>Ctrl + 6   --> power of 2</li>
        <li>Ctrl + 8   --> multiplication</li>
        <li>Ctrl + "=" --> addition</li>
        <li>Ctrl + "-" --> sign change</li> 
      </ul>
      </div>
    <div class="calculator">
      <div class="prev">{{ calculator.previous || '' }} {{ calculator.sign }}</div>
      <div class="display">{{ calculator.current || '0' }}</div>
      <div v-shortkey.once="['ctrl','5']" @shortkey="percent" @click="percent" class="btn operator">%</div>
      <div v-shortkey.once="['ctrl', '1']" @shortkey="sqrt" @click="sqrt" class="btn operator">&#x221a;</div>
      <div v-shortkey.once="['ctrl', '6']"@shortkey="pow" @click="pow" class="btn operator">x²</div>
      <div v-shortkey.once="['ctrl', '2']"@shortkey="inverse" @click="inverse" class="btn operator">1/x</div>
      <div v-shortkey.once="['esc']" @shortkey="clearAll" @click="clearAll" class="btn operator2 c">C</div>
      <div v-shortkey.once="['del']" @shortkey="del" @click="del" class="btn operator2">🔙</div>
      <div v-shortkey.once="['/']" @shortkey="divide" @click="divide" class="btn operator2">÷</div>
      <div v-shortkey.once="['7']" @shortkey="append('7')" @click="append('7')" class="btn">7</div>
      <div v-shortkey.once="['8']"@shortkey="append('8')" @click="append('8')" class="btn">8</div>
      <div v-shortkey.once="['9']"@shortkey="append('9')" @click="append('9')" class="btn">9</div>
      <div v-shortkey.once="['ctrl', '8']"@shortkey="times" @click="times" class="btn operator2">x</div>
      <div v-shortkey.once="['4']"@shortkey="append('4')" @click="append('4')" class="btn">4</div>
      <div v-shortkey.once="['5']"@shortkey="append('5')" @click="append('5')" class="btn">5</div>
      <div v-shortkey.once="['6']"@shortkey="append('6')" @click="append('6')" class="btn">6</div>
      <div v-shortkey.once="['-']"@shortkey="minus" @click="minus" class="btn operator2">-</div>
      <div v-shortkey.once="['1']"@shortkey="append('1')" @click="append('1')" class="btn">1</div>
      <div v-shortkey.once="['2']"@shortkey="append('2')" @click="append('2')" class="btn">2</div>
      <div v-shortkey.once="['3']"@shortkey="append('3')" @click="append('3')"class="btn">3</div>
      <div v-shortkey.once="['ctrl','=']"@shortkey="add" @click="add" class="btn operator2">+</div>
      <div v-shortkey.once="['ctrl','-']"@shortkey="sign" @click="sign" class="btn">±</div>
      <div v-shortkey.once="['0'] "@shortkey="append('0')" @click="append('0')" class="btn">0</div>
      <div v-shortkey.once="['.']" @shortkey="dot" @click="dot" class="btn">.</div>
      <div v-shortkey.once="['enter'] "@shortkey="equal" @click="equal" class="btn operator2">=</div>
    </div>
    
  </div>
</template>

<style scoped>
* { font-size: 25px }

.calculator {
  margin: 0 auto;
  width: 250px;
  height: 450px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(30px, auto);
  box-shadow: 5px 10px 8px #888888;
}

.display {
  padding: 2px;
  grid-column:  1 / 5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #333;
  color: #fff;
}
.prev {
  grid-column:  1 / 5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #333;
  color: #fff;
  border: 1px solid #eee
}

.c {
  grid-column:  1 / 3;
}

.btn {
  background-color: #f2f2f2;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn:hover { background-color: rgb(33.8%, 86.6%, 50.5%); cursor: pointer; }

.operator { background-color:rgb(34.7%, 53.3%, 84.7%) }
.operator:hover { background-color: rgb(21.9%, 37.6%, 64%); cursor: pointer; }
.operator2 { background-color: rgb(32.1%, 50.5%, 81.6%) }
.operator2:hover { background-color: rgb(21.9%, 37.6%, 64%); cursor: pointer; }

.div{
  text-align:left;
  font-style: Arial;
}

</style>


