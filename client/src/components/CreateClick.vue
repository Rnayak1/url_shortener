<template>
  <div class="row ms">
    <div class="col-8 err" v-if="linkerror">
      <span style="position:absolute; right:5px; top : 3px; cursor:pointer" @click="clearError"> &times; </span>
      <span>{{linkerror}}</span>
    </div>
    <div class="col-sm-6 col-xs-12">
      <div class="col-12">
        <h3>Enter your url</h3>
      </div>
      <div class="col-12 input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Url :</span>
        </div>
        <input
          type="text"
          v-model="orignalUrl"
          class="form-control"
          placeholder="your campaign url"
        />
      </div>
      <br />
      <div class="col-12 input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">http://domain/campain/</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Your custom url (min 6 length)"
          minlength="6"
          @input="clickCheck($event.data)"
        />
        <br />
        <span v-if="customError">
          only
          <b>A-Z a-z 0-9</b> are supported rest will be omitted
        </span>
      </div>
    </div>
    <div class="col-sm-6 col-xs-12">
      <div class="col-12">
        <h3>
            <b>Your preview link</b>
        </h3>
      </div>
      <div class="col-12 urlbox">
        <div class="col-10" v-if="passedUrl && orignalUrl && (passedUrl.length >5)">
          <span>Your Url will be</span>
          <br />
          <span>https://domain/{{passedUrl}}</span>
        </div>
        <div class="col-2" v-if="orignalUrl">
          <a class="btn btn-primary"  @click.prevent="generateUrl()">Generate</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-group-text{
  font-size: 12px
}
.urlbox{
  border: 2px solid #13a62a;
  padding: 5px;
}
.err{
  position: absolute;
padding: 5px;
border: 1px solid green;
justify-content: center;
text-align: center;
background: #2b7b3f;
margin-top: -6%;
margin-left: 40px;
z-index: +1;
}
</style>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import link from "@/store/module/link";
@Component
export default class CreateClick extends Vue {
  orignalUrl = "";
  passedUrl = "";
  linkerror = "";
  customError = false;

  // Function to verify only [A-Z a-z 1-9] are added in custom url
  clickCheck($event: string | null) {
    if ($event != null) {
      console.log($event.charCodeAt(0));
      if (
        (97 <= $event.charCodeAt(0) && $event.charCodeAt(0) <= 122) ||
        (65 <= $event.charCodeAt(0) && $event.charCodeAt(0) <= 90) ||
        (48 <= $event.charCodeAt(0) && $event.charCodeAt(0) <= 57)
      ) {
        this.passedUrl += $event;
      } else this.customError = true;
    }
  }
  //conditional rendering
  clearError(){
     this.orignalUrl = ""
     this.passedUrl = ""
    return this.linkerror = ""
  }
  /* 
      function to generate custom url in store/module/link.ts 
      returns 
      {
        status : error/success
        message : repsonse by server
      }
  */
  async generateUrl() {
    console.log(this.orignalUrl, this.passedUrl);
    const response = await link.generate({
      orignal: this.orignalUrl,
      passed: this.passedUrl
    });
    if(response.status == "error")
      return this.linkerror = response.message;
    else
      return this.linkerror = `Generated :  http://localhost:8080/#/${response.shortUrl}`;
  }
}
</script>