import { shallowMount } from "@vue/test-utils";
import createClick from "@/components/createClick.vue";
import AppNavBar from "@/components/AppNavBar.vue";

// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });

describe("Home.vue", () => {
  it("renders router-link when mounted", () => {
    const wrapper = shallowMount(createClick);
    expect(wrapper.text());
  })
});
describe("Home.vue", () => {
  it("renders router-link when mounted", () => {
    const wrapper = shallowMount(AppNavBar);
    expect(wrapper.text());
  })
})