<template>
  <div class="row">
    <div class="col-12" v-if="urlMessage.status">
      <span>{{urlMessage.shortUrl}}</span>
    </div>
    <div class="col-6">
      <div class="col-4">
        <p>Enter your url</p>
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
    <div class="col-6">
      <div class="col-12">
        <h3>
          <center>
            <b>Your preview link</b>
          </center>
        </h3>
      </div>
      <div class="col-12">
        <div class="col-10" v-if="passedUrl && orignalUrl && (passedUrl.length >5)">
          <span>Your Url is</span>
          <br />
          <span>https://domain/campain/{{passedUrl}}</span>
        </div>
        <div class="col-2" v-if="orignalUrl && !linkerror">
          <button class="btn btn-primary" @click="generateUrl()">Generate</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import link from "@/store/module/link";
@Component
export default class CreateClick extends Vue {
  orignalUrl = "";
  passedUrl = "";
  linkerror = "";
  urlMessage = "";
  customError = false;
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

  async generateUrl() {
    console.log(this.orignalUrl, this.passedUrl);
    const response = await link.generate({
      orignal: this.orignalUrl,
      passed: this.passedUrl,
      userid: "abc"
    });
    console.log(response);
    this.urlMessage = response.toString();
  }
}
</script>