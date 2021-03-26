<template>
  <div class="pt-4 flex m-4 flex-col">
    <div
      class="container bg-melon inline rounded-xl font-arial leading-loose pb-4"
    >
      <h1 class="text-dBlack font-semibold text-lg pt-4">How it works</h1>
      <p>
        This application creates a timetable based on a csv input. All
        calculations and data are stored client side only. Export to save
        results
      </p>
      <h1 class="text-dBlack font-semibold text-lg pt-2">Expected Input</h1>
      <p>
        The system should automatically detect which delimiter is used. Avoid
        commas in the input
      </p>
      <p>
        Example of a row: "Smiths Woodwork; Ye Old Crafters|Guild
        Incorporated|Shuffles AS;woodcraft"
      </p>
      <ol class="list-disc pl-4">
        <li>The first row contains the names of the attendes.</li>
        <li>
          The second row contains a delimiter separated string of priority
          meetings i.e. name of other attendees. The default delimiter is "|"
          but this can be changed in the options. Can be empty.
        </li>
        <li>
          The third row contains classification. This is used to indicate that
          attendees with the same classification are excluded from the meeting
          planner. Can be empty
        </li>
      </ol>
      <h1 class="text-dBlack font-semibold text-lg pt-2">Options setup</h1>

      <p>
        <strong>Encoding:</strong> Is set to ISO-8859-1 by default which is
        windows excel ANSI encoding of utf-8 character (æ, ø , å). If csv is
        created by other sources, set to UTF-8
      </p>

      <p>
        <strong>Sub-Delimiter:</strong> Delimiter used in the second row. Change
        if other delimiter is used here
      </p>

      <p>
        <strong>Iterations:</strong> Due to the complexity of the problem, the
        system attempts this many itterations and chooses the best outcome. The
        priority is to fill the table, followed by number of first priority
        meetings fitted (both parties have pre existing desire to meet) followed
        by second priority meetings fitted (one party has pre existing desire to
        meet). Rough estimate: 200 iterations per second.
      </p>

      <p>
        <strong>Tables:</strong> The number of tables (columns) are
        automatically set to half the number of attendees rounding down, but can
        be overriden by user in options. 0 = automatic
      </p>
      <p><strong>Slots:</strong> Number of timeslots (rows) to incorporate.</p>
      <strong class="flex justify-center pt-2"
        >Web page will become unresponsive while processing. Check console log
        (F12 -> console) for progress information</strong
      >
    </div>

    <div
      class="container flex flex-col items-center bg-mint mt-4 rounded-xl p-4"
    >
      <h1 class="text-dBlack font-semibold text-lg pt-2">Options</h1>
      <label
        class="bg-sand hover:bg-clay cursor-pointer text-dBlack font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <svg v-if="fileAccept" class="fill-current text-red-600" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" width="18" height="18"><g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"><path d="M11.711,18.71l-5.1-5.1a2.277,2.277,0,1,1,3.221-3.22l3.245,3.244,6.076-8.1a2.277,2.277,0,0,1,3.643,2.733l-7.652,10.2A2.276,2.276,0,0,1,11.711,18.71Z" fill="green" stroke="#000000" stroke-linejoin="round" stroke-width="1.5"></path><path d="M11.705,8.537l2.253-3.006a2.28,2.28,0,0,1,2.449-.823" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M8.891,19.246a2.277,2.277,0,0,1-2.373-.536l-5.1-5.1A2.277,2.277,0,0,1,3.782,9.85" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" width="20" height="20"><g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"><path d="M11.250 17.250 A6.000 6.000 0 1 0 23.250 17.250 A6.000 6.000 0 1 0 11.250 17.250 Z" fill="red" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M13.008 21.491L21.492 13.008" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M8.25,20.25h-6a1.5,1.5,0,0,1-1.5-1.5V2.25A1.5,1.5,0,0,1,2.25.75H12.879a1.5,1.5,0,0,1,1.06.439l2.872,2.872a1.5,1.5,0,0,1,.439,1.06V8.25" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg>
        <span class="pl-2">Upload file</span>
        <input hidden type="file" @change="onFileChange" />
        <!--input class="cursor-pointer absolute block opacity-0 pin-r pin-t" type="file" @change="onFileChange"-->
      </label>
      <span>Encoding</span
      ><input
        class="border rounded-lg w-28 text-center"
        type="text"
        v-model="encoding"
      />
      <span>Sub delimiter</span
      ><input
        class="border rounded-lg w-28 text-center"
        type="text"
        maxlength="1"
        v-model="delimiter"
      />
      <span>Iterations</span
      ><input
        class="border rounded-lg w-28 text-center appearance-none"
        type="number"
        min="1"
        v-model="iterations"
      />
      <span>Tables</span
      ><input
        class="border rounded-lg w-28 text-center appearance-none"
        type="number"
        min="0"
        v-model="overideTables"
      />
      <span>Slots</span
      ><input
        class="border rounded-lg w-28 text-center appearance-none"
        type="number"
        min="0"
        v-model="slots"
      />
      <select v-model="mode">
        <option disabled value="">Please select priority handling</option>
        <option>Ordered</option>
        <option>Ordered with Genetic</option>
        <option>Head Only</option>
        <option>Unordered</option>
      </select>

      <button
        class="bg-sand hover:bg-clay cursor-pointer text-dBlack font-bold py-2 mt-2 px-4 rounded inline-flex items-center justify-between"
        @click="mainRunner"
      >
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" width="30" height="30"><g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"><path d="M8.25,18.75H3.75a3,3,0,0,1-3-3v-12a3,3,0,0,1,3-3h12a3,3,0,0,1,3,3v3" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M6.75 0.75L6.75 18.75" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M12.75 0.75L12.75 9.75" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M18.75 6.75L0.75 6.75" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M8.25 12.75L0.75 12.75" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M15.750 16.500 A1.500 1.500 0 1 0 18.750 16.500 A1.500 1.500 0 1 0 15.750 16.500 Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M18.525,10.7l.442,1.453a.993.993,0,0,0,1.173.681l1.473-.341a1.338,1.338,0,0,1,1.274,2.218l-1.03,1.111a1,1,0,0,0,0,1.362l1.03,1.111a1.338,1.338,0,0,1-1.274,2.218l-1.473-.341a.993.993,0,0,0-1.173.681L18.525,22.3a1.331,1.331,0,0,1-2.549,0l-.442-1.453a.993.993,0,0,0-1.173-.681l-1.473.341a1.338,1.338,0,0,1-1.274-2.218l1.03-1.111a1,1,0,0,0,0-1.362l-1.03-1.111a1.338,1.338,0,0,1,1.274-2.218l1.473.341a.993.993,0,0,0,1.173-.681l.442-1.453A1.331,1.331,0,0,1,18.525,10.7Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg>
        <span class="pl-2">Generate Timetable</span>
      </button>
    </div>
    <div v-if="inProcess">
      <h1>Processing....Check console log for progress</h1>
    </div>

    <div
      class="container flex flex-col items-center bg-melon rounded-xl mt-4 p-4"
      v-if="preview"
    >
      <div class="flex-row">
        <p class="pl-2 pr-2 text-dBlack font-semibold">{{ fieldsFilled }}</p>
        <p class="pl-2 pr-2 text-dBlack font-semibold">{{ firstprioScore }}</p>
        <p class="pl-2 pr-2 text-dBlack font-semibold">{{ secondPrioScore }}</p>
      </div>
      <button
        class="bg-sand hover:bg-clay cursor-pointer text-dBlack font-bold py-2 px-4 rounded inline-flex items-center"
        @click="csvExport(preview)"
      >
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>Export</span>
      </button>
    </div>

    <div class="flex">
      <table
        v-if="preview"
        class="table-auto border-collapse border-green-900 m-4 max-w-full text-xs"
      >
        <tr>
          <td
            class="border bg-gray-200"
            v-for="value in tables + 1"
            :key="value"
          >
            <span v-if="value != 1">Table {{ value - 1 }}</span>
          </td>
        </tr>
        <tr class="border" v-for="(row, index1) in preview" :key="index1">
          <td class="bg-gray-200">Slot {{ index1 + 1 }}</td>
          <td class="border" v-for="(cell, index2) in row" :key="index2">
            {{ cell }}
          </td>
        </tr>
      </table>
    </div>
    <footer
      class="container bg-melon p-2 rounded-xl mt-4 flex justify-center font-semibold text-dBlack"
    >
      <p>Contact Johnny.bjanesoy@knowit.no for support</p>
      <p>       V.1</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      wishArray: [],
      iterations: 1000,
      delimiter: "|",
      encoding: "ISO-8859-1",
      datainput: null,
      preview: null,
      tables: null,
      overideTables: 0,
      firstPriority: [],
      secondPriority: [],
      otherPriority: [],
      noMeeting: [],
      processedMeeting: [],
      slots: 10,
      fileAccept: false,
      inProcess: false,
      processed: false,
      markup : true,
      maxPriorities : 0,
      mode: "Ordered",
      genetic: false,
      headonly: false,


      fieldsFilled: null,
      firstprioScore: null,
      secondPrioScore: null,
    };
  },

  methods: {
    //MISC
    // Fisher-Yates shuffle
    shuffle(arr) {
      let i, j, temp;
      for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    },

    //helper function for include method
    arrayInclude(arr, value) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == value[0] && arr[i][1] == value[1]) {
          return true;
        }
      }
      return false;
    },

    //For running the process
    mainRunner() {
      this.inProcess = true;
      if (!this.processed) {
        this.datainput = this.processWishes(this.datainput);
        this.processed = true
      }
      let possible = Object.values(this.datainput).length;

      if (this.overideTables == 0) {
        this.tables = parseInt(Math.floor(possible / 2));
      } else {
        this.tables = this.overideTables;
      }
      if(this.mode == "Unordered"){

        this.firstPrio(this.datainput);
        this.secondPrio(this.datainput);
        this.remaining(this.datainput);
        this.bruteForce();
      }
      else if(this.mode =="Ordered" || this.mode == "Ordered with Genetic" || this.mode=="Head Only"){
            if(this.mode == "Ordered with Genetic"|| this.mode=="Head Only"){
          this.genetic = true
        }
        if(this.mode=="Head Only"){
          this.headonly = true
        }
        console.log("Ordered mode")
        console.log(this.datainput)
        this.generatePriorities()
        console.log(this.processedMeeting)
        this.alternateRemaining(this.datainput)
        this.tableWithPriorityIndex()

      }
      else{
        console.log("ERROR: No mode in system")
      }
    },

    //FILE OPERATIONS
    //Register that a file has been uploaded and starts processing
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.processData(files[0]);
    },

    //use Vue-Papa-Parser to transform csv file object to Array. NOTE! encoding set to ISO-8859-1 since UTF-8 is apperantly not what excel encodes in
    //Complete: Async process so complete parameter defines callback function
    processData(tableData) {
      this.$papa.parse(tableData, {
        encoding: this.encoding,
        complete: this.parsingComplete,
      });
    },
    parsingComplete(results) {
      this.datainput = Object.values(results.data);
      if (this.datainput[this.datainput.length - 1][0] == "") {
        this.datainput.pop();
      }
      this.fileAccept = true;
    },

    //split sub csv into list (wishes)
    processWishes(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i][1] != undefined) {
          data[i][1] = data[i][1].split(this.delimiter);
        }
      }
      return data;
    },

    //Export CSV to downloadable file. Script stolen form the web and modified, note that the expected input is excel CSV which required
    //universal boom due to how dumb microsoft are with ANSI encoding
    csvExport(arrData) {
      let csv = "æ;ø;å";
      let universalBOM = "\uFEFF";
      let csvContent =
        "data:text/csv;charset=utf-8," + encodeURIComponent(universalBOM + csv);

      csvContent += [
        Object.keys(arrData[0]).join(";"),
        ...arrData.map((item) => Object.values(item).join(";")),
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const link = document.createElement("a");
      link.setAttribute("href", csvContent);
      link.setAttribute("download", "export.csv");
      link.click();
    },

    //TABLE GENERATION
    generatePriorities(){
      let maxValue = 0
      for(let i = 0; i < this.datainput.length; i++){
        if(this.datainput[i][1].length > maxValue){
          maxValue = this.datainput[i][1].length 
        }
      }
      if(this.headonly){
        maxValue=4
      }
      for(let j = 0; j < maxValue; j++){
        let tempstorage = this.getPriority(this.datainput, j)
        if(tempstorage != undefined){
          this.wishArray.push(tempstorage)
        }
      }
      console.log("Wishes")
      console.log(this.wishArray)
      this.maxPriorities = maxValue
    },

    getPriority(data,index){
      let temp = []
      for(let i = 0; i < data.length; i++){
        if(data[i][1][index] != undefined && data[i][1][index] != ""){
          let tempsort = [data[i][0],data[i][1][index]]
          tempsort.sort()
          if(!this.arrayInclude(this.processedMeeting, tempsort)){
            this.processedMeeting.push(tempsort) 
            temp.push(tempsort)
          }
        }
      }
      if(temp.length == 0){
        return undefined
      }
      else{
        return temp
      }
    },

    individualPriorities(meetings){
      let resultList = []
      for(let i = 0; i < this.datainput.length;i++){
        let counter = 0
        for(let j = 0; j < this.datainput[i][1].length; j++){
          let temp = [this.datainput[i][0],this.datainput[i][1][j]]
          temp.sort()
          if(this.arrayInclude(meetings,temp)){
            counter ++
          }
        }
        let something = 0
        if(this.datainput[i][1].length == 1 && counter == 0){
          something = 0
        }
        else{
          something = this.datainput[i][1].length 
        }
        resultList.push(this.datainput[i][0] + " satisfied meetings:  " + counter + "/" + something)
      }
      return resultList

    },




    alternateRemaining(data){
      for(let i = 0; i < data.length; i++){
        for(let j = i+1; j < data.length; j++){
          if(this.datainput[i][2] != "" && this.datainput[i][2] != undefined && this.datainput[i][2] != this.datainput[j][2]){
            let temp = [this.datainput[i][0], this.datainput[j][0]]
            if( !this.arrayInclude(this.processedMeeting, temp)){
              this.otherPriority.push(temp)
            }
          }
        }
      }
      console.log("Other priorities")
      console.log(this.otherPriority)
    },

    tableWithPriorityIndex(){
      let havemet = []
      let dayplan = []
      let bestScores = []
      let fieldsFilled = 0
      let bestTable = [];
      let geneticMatches = [];
      let havemetBest = []
      for(let i = 1; i <= this.maxPriorities; i ++){
        bestScores.push(0)
      }
      let tempScores = bestScores

      let progress = 0;
      for (let x = 0; x < this.iterations; x++) {
        for(let v = 0; v < this.wishArray.length; v++){
          this.wishArray[v] = this.shuffle(this.wishArray[v])
        }
        this.otherPriority = this.shuffle(this.otherPriority)
        havemet = [];
        dayplan = [];
        geneticMatches = []
        tempScores = bestScores

        let intermediate = Math.floor(((x + 1) / this.iterations) * 100);
        if (intermediate != progress) {
          progress = intermediate;
          console.log(progress + "% Complete...");
        }
        for(let s = 0; s < this.slots; s++){
          let inMeeting = []
          let slotplan = []
          for(let t = 0; t < this.tables; t++){
            let foundMatch = false
            for(let w = 0; w < this.wishArray.length; w++){
              for(let i = 0; i < this.maxPriorities; i++){
                let meeting = this.wishArray[w][i]
                if(meeting != undefined && meeting.includes("Eiendomsappen") && s < 5){
                  continue
                }
                else if(meeting != undefined && !inMeeting.includes(meeting[0]) && !inMeeting.includes(meeting[1]) && !this.arrayInclude(havemet, meeting)){
                  havemet.push(meeting)
                  inMeeting.push(meeting[0])
                  inMeeting.push(meeting[1])
                  let prioritynumber = w + 1
                  slotplan.push(meeting[0] + " - " + meeting[1] + " (" + prioritynumber +")")

                  geneticMatches.push([meeting[0],meeting[1],prioritynumber])
                  foundMatch = true
                  break
                }
              }
              if(foundMatch){
                break
              }
            }
            if(!foundMatch){
              for(let j = 0; j < this.otherPriority.length; j++){
                let meeting = this.otherPriority[j]
                                if(meeting != undefined && meeting.includes("Eiendomsappen") && s < 5){
                  continue
                }
                else 
                if(meeting != undefined && !inMeeting.includes(meeting[0]) && !inMeeting.includes(meeting[1]) && !this.arrayInclude(havemet, meeting)){
                  havemet.push(meeting)
                  inMeeting.push(meeting[0])
                  inMeeting.push(meeting[1])
                  slotplan.push(meeting[0] + " - " + meeting[1])
                  break
                }
              }
            }
          }
          dayplan.push(slotplan)
        }
        let score = 0;
        for (let m = 0; m < dayplan.length; m++) {
          score += dayplan[m].length;
        }
        let fieldsBetter = false
        if(fieldsFilled < score){
          fieldsFilled = score
          fieldsBetter = true
          for(let a = 0; a < havemet.length; a++){
            for(let b = 0; b < this.wishArray.length; b++){
              if(this.arrayInclude(this.wishArray[b],havemet[a])){
                tempScores[b]++
                break 
              }
            }
          }
          let betterMatch = true
          for(let c = 0; c < tempScores.length; c++){
            if(tempScores[c] > bestScores[c]){
              betterMatch = true
              break
            }
            else if(tempScores[c] < bestScores[c]){
              betterMatch = false;
              break
            }
          }
          if(betterMatch || fieldsBetter){
            bestScores = tempScores
            bestTable = dayplan
            havemetBest = havemet
            console.log("Bettermatch!")
          }
        }
      }
      if(this.genetic){
        let remainingWishes = []
        for(let x = 0; x < this.wishArray.length; x++){
          for(let y = 0; y < this.wishArray[x].length; y++){
            if(!this.arrayInclude(geneticMatches,this.wishArray[x][y])){
              let prioritynumber = x + 1
              remainingWishes.push([this.wishArray[x][y][0],this.wishArray[x][y][1], prioritynumber])
            }
          }
        }
        this.GeneticFollow(bestTable,geneticMatches, remainingWishes,fieldsFilled)
      }
      else{
      console.log(this.individualPriorities(havemetBest))
      this.preview = bestTable
      }
    },

    GeneticFollow(bestTable, geneticroot, remainingwishes, fieldsFilled){
      //let subsample = remainingwishes.concat(this.otherPriority)
      let subsample = [...remainingwishes, ...this.otherPriority]
      console.log("Score to beat: " + fieldsFilled)
      console.log("Sample length: " + subsample.length)
      console.log(subsample)
      console.log("Genetic Root length: " + geneticroot.length)
      console.log(geneticroot)
      let progress = 0
      let extendedrun = this.iterations*100
      let havemetBest = []
      for(let x = 0; x < extendedrun; x++){
        geneticroot = this.shuffle(geneticroot)
        subsample = this.shuffle(subsample)
        let minimum = (this.tables*this.slots)-fieldsFilled
        let havemet = []
        let dayplan = []
        let emptySlot = 0
        let abandon = false
        let newroot = []
        /*
        var arr = [];
        while(arr.length < 30){
          var r = Math.floor(Math.random() * subsample.length) + 1;
          if(arr.indexOf(r) === -1) arr.push(r);
        }
        for(let i = 0; i < arr.length; i++){
          trialbunch.push(subsample[arr[i]])
        }
        */


        let intermediate = Math.floor(((x + 1) / extendedrun) * 100);
        if (intermediate != progress) {
          progress = intermediate;
          console.log(progress + "% Complete...");
        }
        for(let s = 0; s < this.slots; s++){
          let inMeeting = []
          let slotplan = []
          for(let t = 0; t < this.tables; t++){
            let foundMatch = false

            for(let w = 0; w < geneticroot.length; w++){
              let meeting = geneticroot[w]
                              if(meeting != undefined && meeting.includes("Eiendomsappen") && s < 5){
                  continue
                }
                else 
              if(meeting != undefined && !inMeeting.includes(meeting[0]) && !inMeeting.includes(meeting[1]) && !this.arrayInclude(havemet, meeting)){
                havemet.push(meeting)
                inMeeting.push(meeting[0])
                inMeeting.push(meeting[1])
                let category = ""
                if(meeting.length == 3){
                  category = "(" + meeting[2] + ")"
                  newroot.push(meeting)
                }
                slotplan.push(meeting[0] + " - " + meeting[1] + " " + category)
                foundMatch = true
                break
              }
            }

            if(!foundMatch){
              for(let v = 0; v < subsample.length; v++){
                let meeting = subsample[v]
                                if(meeting != undefined && meeting.includes("Eiendomsappen") && s < 5){
                  continue
                }
                else 
                if(meeting != undefined && !inMeeting.includes(meeting[0]) && !inMeeting.includes(meeting[1]) && !this.arrayInclude(havemet, meeting)){
                  havemet.push(meeting)
                  inMeeting.push(meeting[0])
                  inMeeting.push(meeting[1])
                  let category = ""
                  if(meeting.length == 3){
                    category = "(" + meeting[2] + ")"
                    newroot.push(meeting)
                    
                  }
                  slotplan.push(meeting[0] + " - " + meeting[1] + " " + category)
                  foundMatch = true
                  break
                }
              }
            }
            if(!foundMatch){
              emptySlot ++
              if(emptySlot > minimum){
                abandon = false
                //break
              }
            }
          }
          if(abandon){
            //break
            continue
          }
          dayplan.push(slotplan)
        }
        if(!abandon){
          let score = 0
          for(let i = 0; i < dayplan.length; i++){
            score += dayplan[i].length
          }
          if((score == fieldsFilled && newroot.length > geneticroot.length) || (score > fieldsFilled && newroot.length == geneticroot.length) || (score > fieldsFilled && newroot.length > geneticroot.length)){
            console.log("Found better fit!")
            console.log("Fieldsfilled: " + score + ", priorities met: " + newroot.length)
            fieldsFilled = score
            geneticroot = newroot
            bestTable = dayplan
            havemetBest = havemet
            let temparr = []
            for(let x = 0; x < this.wishArray.length; x++){
              for(let y = 0; y < this.wishArray[x].length; y++){
                if(!this.arrayInclude(geneticroot,this.wishArray[x][y])){
                  let prioritynumber = x + 1
                  temparr.push([this.wishArray[x][y][0],this.wishArray[x][y][1], prioritynumber])
                }
              }
            }
            subsample = [...temparr, ...this.otherPriority]
          }
        }

      }
      console.log(this.individualPriorities(havemetBest))
      this.preview = bestTable  
    },

//meetings both parties desire
    firstPrio(data) {
      let output = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          if (
            data[i][1].includes(data[j][0]) &&
            data[j][1].includes(data[i][0])
          ) {
            output.push([data[i][0], data[j][0]]);
          }
        }
      }
      console.log("First priorities");
      console.log(output);
      this.firstPriority = output;
    },

    //Meetings one party desire
    secondPrio(data) {
      let output = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i][1] != undefined && data[i][1] != "") {
          for (let j = 0; j < data[i][1].length; j++) {
            let match = [data[i][0], data[i][1][j]].sort();
            if (!this.arrayInclude(this.firstPriority, match)) {
              output.push(match);
            }
          }
        }
      }
      console.log("Second Priorities");
      console.log(output);
      this.secondPriority = output;
    },

    //all other possible meetings
    remaining(data) {
      let combination_list = [];
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
          if (data[i][0] != "" && data[j][0] != "") {
            let match = [data[i][0], data[j][0]];
            if (
              !this.arrayInclude(this.firstPriority, match) &&
              !this.arrayInclude(this.secondPriority, match)
            ) {
              if (
                data[i][2] != "" &&
                data[i][2] != undefined &&
                data[i][2] == data[j][2]
              ) {
                this.noMeeting.push([data[i][0], [data[j][0]]]);
              } else {
                combination_list.push([data[i][0], data[j][0]]);
              }
            }
          }
        }
      }
      console.log("Third priorities");
      console.log(combination_list);
      console.log("No meetings");
      console.log(this.noMeeting);
      this.otherPriority = combination_list;
    },

    //Main function for searching for and finding best table
    bruteForce() {
      console.log("Finding best match...");
      let bestScore = 0;
      let bestFirstScore = 0;
      let bestSecondScore = 0;
      var bestTable = [];
      let progress = 0;
      let haveMet = [];
      let havemetBest = []

      let brute = this.firstPriority.concat(
        this.secondPriority,
        this.otherPriority
      );
      for (let x = 0; x < this.iterations; x++) {
        brute = this.shuffle(brute);
        haveMet = [];
        let dayplan = [];

        let intermediate = Math.floor(((x + 1) / this.iterations) * 100);
        if (intermediate != progress) {
          progress = intermediate;
          console.log(progress + "% Complete...");
        }
        for (let i = 0; i < this.slots; i++) {
          let slotplan = [];
          let inMeeting = [];
          for (let j = 0; j < this.tables; j++) {
            for (let k = 0; k < brute.length; k++) {
              let temp = brute[k];
                              if(temp != undefined && temp.includes("Eiendomsappen") && i < 5){
                  continue
                }
                else 
              if (
                temp != undefined &&
                !this.arrayInclude(haveMet, temp) &&
                !inMeeting.includes(temp[0]) &&
                !inMeeting.includes(temp[1])
              ) {
                haveMet.push(temp);
                inMeeting.push(temp[0]);
                inMeeting.push(temp[1]);
                let append = ""
                if(this.markup)
                  if(this.arrayInclude(this.firstPriority,temp)){
                    append = "(1)"
                  }
                  else if(this.arrayInclude(this.secondPriority,temp)){
                    append = "(2)"
                  }
                  slotplan.push(temp[0] + " - " + temp[1] + " " + append);
                break;
              }
            }
          }
          dayplan.push(slotplan);
        }
        let score = 0;
        for (let m = 0; m < dayplan.length; m++) {
          score += dayplan[m].length;
        }
        let firstCount = 0;
        for (let i = 0; i < this.firstPriority.length; i++) {
          if (this.arrayInclude(haveMet, this.firstPriority[i])) {
            firstCount++;
          }
        }
        let secondCount = 0;
        for (let i = 0; i < this.secondPriority.length; i++) {
          if (this.arrayInclude(haveMet, this.secondPriority[i])) {
            secondCount++;
          }
        }

        if (score >= bestScore && firstCount > bestFirstScore) {
          bestScore = score;
          bestFirstScore = firstCount;
          bestSecondScore = secondCount;
          console.log("New best score!: " + bestScore);
          bestTable = dayplan;
          havemetBest = haveMet
        } else if (
          score >= bestScore &&
          firstCount >= bestFirstScore &&
          secondCount > bestSecondScore
        ) {
          bestScore = score;
          bestFirstScore = firstCount;
          bestSecondScore = secondCount;
          console.log("New best score!: " + bestScore);
          bestTable = dayplan;
          havemetBest = haveMet
        }
      }
      this.fieldsFilled = bestScore;
      this.preview = bestTable;
      this.fieldsFilled =
        "Fields filled: " + bestScore + "/" + this.tables * this.slots;
      this.firstprioScore =
        "First Priority managed: " +
        bestFirstScore +
        "/" +
        this.firstPriority.length;
      this.secondPrioScore =
        "Second Priority matches " +
        bestSecondScore +
        "/" +
        this.secondPriority.length;
      console.log("Meeting conditions:")
      console.log(haveMet)
      console.log(this.individualPriorities(havemetBest))
      this.inProcess = false;
    },
  },
};
</script>
<style scoped>
</style>
