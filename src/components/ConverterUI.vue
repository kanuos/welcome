<template>
  <form id="converter" @submit.prevent="convertUnits">
		<h4 class="form-heading">
			{{unit}} converter
		</h4>
		<div class="form-group">
			<div class="input-group">
				<input 
                    v-model="inputValue"
                    required
                    type="text" 
                    id="time" 
                    autocomplete="off"
                    :placeholder="`Enter ${unit} here`">
				<label for="time">Enter {{unit}} here</label>
				<h4 class="group-legend">
					1. Please enter the {{unit}} value
				</h4>
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
				<select v-model="inputUnit" required>
                    <option 
                        v-for="unit in input" :key="unit" :value="unit">
                        {{unit}}
                    </option>
                </select>
				<h4 class="group-legend">
					2. Please enter the {{unit}} unit you want to convert 
					<span class="highlight">from</span>
				</h4>
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
                <select v-model="outputUnit" required>
                    <option 
                        v-for="unit in output" :key="unit" :value="unit">
                        {{unit}}
                    </option>
                </select>
                <h4 class="group-legend">
					3. Please enter the {{unit}} unit you want to convert
					<span class="highlight">to</span>
				</h4>
			</div>
		</div>
		<div class="input-group">
			<button>Convert</button>
		</div>
		<div id="result">
			<h1 v-if="inputValue.length && outputValue.length && showResult">
                {{inputValue}} {{inputUnit}} = {{outputValue}} {{outputUnit}}
			</h1>
            <Loader v-else-if="isLoading"/>
            <h1 v-else class="errorMessage">
                {{errorMessage}}
			</h1>
		</div>
	</form>
</template>

<script>
import Loader from './Loader'
import Converter from 'unit-converter-pro';
import units from '../conversion'
export default {
    data(){
        return {
            inputValue: "",
            inputUnit : "",
            outputUnit: "",
            outputValue : "",
            errorMessage : "",
            isLoading : false,
            showResult : false
        }
    },
    components : {Loader},
	props : ['input', 'output','unit','submit', 'currency'],
    methods : {
        convertUnits(){
            if (this.inputValue){
                this.isLoading = true;        
                const key = this.unit.toLowerCase();
                const from = units[key][this.inputUnit];
                const to = units[key][this.outputUnit];
                const value = parseFloat(this.inputValue.trim());
                if (value){
                    let obj = {};
                    switch(this.unit){
                        case "Length": 
                            obj = new Converter.Length();
                            this.outputValue = (obj[from](value)[to]()).toFixed(2);
                            break;
                        case "Area":
                            obj= new Converter.Area();
                            this.outputValue = (obj[from](value)[to]()).toFixed(2);
                            break;
                        case "Mass":
                            obj= new Converter.Mass()
                            this.outputValue = (obj[from](value)[to]()).toFixed(2);
                            break;
                        case "Temperature":
                            obj= new Converter.Temperature()
                            this.outputValue = (obj[from](value)[to]()).toFixed(2);
                            break;
                        case "Time":
                            obj= new Converter.Time()
                            this.outputValue = (obj[from](value)[to]()).toFixed(2);
                            break;
                        case "Currency":
                            this.outputValue = this.currency(this.inputUnit, this.outputUnit, this.inputValue).toFixed(2)
                            break;
                    }
                    setTimeout(()=> {
                        this.isLoading = false;
						this.showResult = true;
					}, 1600);
                }
            }
            else {
                this.errorMessage = "Cannot convert empty values"
                    setTimeout(()=> {
                    this.errorMessage = ""
                }, 1500)
            }
        },
        
	},
	updated(){
		if (this.showResult && !this.isLoading){
			setTimeout(()=> {
				this.showResult = false
				this.inputValue = ""
			}, 3500)
		}
	}
}
</script>

<style scoped>
form#converter {
	background-color: white;
	width: 75%;
	max-width: 45rem;
    min-height: 45rem;;
	height: max-content;
	box-shadow: 0 1px .5rem grey;
	margin: 3rem auto;
	padding: 1.5rem 2rem;
	border-radius: .5rem;
}

.form-heading{
	text-align: center;
	text-transform: uppercase;
	font-size: 2.5rem;
	letter-spacing: -.025rem;
	padding-bottom: 1.5rem;
	border-bottom: 1px solid black;
	margin-bottom: 2.5rem;
}

.group-legend {
	font-size: 1.25rem;
	text-align: center;
	color: grey;
	width: max-content;
	margin: 1rem auto;
	transition: all .4s ease; 
	font-weight: lighter;
}
.input-group {
	display: flex;
	flex-direction: column-reverse;
	position: relative;
	margin: 1.25rem 0;
}

.input-group > input {
	border: none;
	outline: none;
	border-bottom: 1.25px solid grey;
	margin: .5rem 0;
	padding: .25rem;
}
.input-group > input::placeholder,
.input-group > label {
	color: grey;
	font-size: 1.15rem;
}
.input-group > label {
	position: absolute;
	top: 40%;
	color: transparent;
	transition: all .4s ease;
	transform-origin: bottom;
}
.input-group > input:valid ~ label,
.input-group > input:focus ~ label {
	color: black;
	top: 40%;
}
.input-group > input:focus{
	border-color: black;
}
.input-group > input:focus::placeholder{
	visibility: hidden;

}
input:focus ~ h4,
select:focus ~ h4{
	transform: scale(1.1) translateY(-1rem);
	color: black;
    font-weight: bolder;
}
input:focus ~ h4 > span.highlight,
select:focus ~ h4 > span.highlight{
	color: orangered;
}
.input-group > button {
	display: block;
	width: max-content;
	margin: 1.5rem auto;
	padding: .5rem 1.75rem;
	text-transform: uppercase;
	color: white;
	background-color: black;
	border: none;
	cursor: pointer;
	transition: all .4s ease;
	box-shadow: 0 1px .5rem grey; 
}
.input-group > button:hover {
	box-shadow: 0 1px 1rem grey; 
}
.errorMessage {
    color: orangered;
}
#result > h1 {
	background-image: linear-gradient(orangered, red, maroon);
	font-size: 1.75rem;
	background-clip: text;
	color: transparent;
	text-align: center;
}

</style>