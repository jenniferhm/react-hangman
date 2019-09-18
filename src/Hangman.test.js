import React from "react";
import { shallow, mount} from "enzyme";
import toJson from "enzyme-to-json";
import Hangman from './Hangman';

it("renders without crashing", function() {
  shallow(<Hangman />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<Hangman />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
})

it("renders img1 when given incorrect guess", function() {
  let wrapper = mount(<Hangman />);
  
  wrapper
  .find("button[value='b']")
  .simulate("click", { target: { value: "c" }});
  
  expect(wrapper.matchesElement(<img src="1.jpg" />));
});

it("image stays the same with correct guess", function() {
  let wrapper = mount(<Hangman />);

  wrapper
  .find("button[value='a']")
  .simulate("click", { target: { value: "a" }});

  expect(wrapper.matchesElement(<img src="0.jpg" />));
});

it("renders correct number of wrong guesses, when given a wrong guess", function() {
  let wrapper = mount(<Hangman />);

  wrapper.setState({nWrong: 2});

  wrapper
    .find("button[value='c']")
    .simulate("click", { target: { value: "c" }});
  
  expect(wrapper.state().nWrong).toEqual(3);
});

it("show that image disappears after 7 wrong guesses", function() {
  let wrapper = mount(<Hangman />);

  wrapper.setState({nWrong: 6});

  wrapper
    .find("button[value='c']")
    .simulate("click", { target: { value: "c" }});
  
  expect(wrapper.find("img").prop("src")).toEqual(undefined);
});