// dictionary contains 100 words
alert('almost')
dictionary = [
  "when",
  "into",
  "not",
  "set",
  "with",
  "this",
  "long",
  "present",
  "face",
  "follow",
  "want",
  "course",
  "about",
  "little",
  "number",
  "tell",
  "in",
  "after",
  "way",
  "we",
  "on",
  "how",
  "then",
  "other",
  "year",
  "he",
  "another",
  "child",
  "under",
  "use",
  "before",
  "people",
  "at",
  "up",
  "stand",
  "place",
  "no",
  "as",
  "word",
  "now",
  "order",
  "by",
  "of",
  "where",
  "never",
  "have",
  "see",
  "program",
  "between",
  "know",
  "through",
  "so",
  "again",
  "time",
  "public",
  "and",
  "a",
  "think",
  "these",
  "last",
  "line",
  "may",
  "plan",
  "or",
  "few",
  "turn",
  "mother",
  "grow",
  "eye",
  "ask",
  "his",
  "it",
  "could",
  "is",
  "often",
  "important",
  "who",
  "some",
  "story",
  "head",
  "does",
  "small",
  "such",
  "they",
  "thing",
  "here",
  "away",
  "page",
  "our",
  "might",
  "should",
  "always",
  "spell",
  "because",
  "mean",
  "her",
  "that",
  "part",
  "Africa",
  "Thanos",
];

keystrokes = 0;

keystrokes_needed = 0;

word_count = 0;

correct_word = 0;

wrong_word = 0;

wrong = false;

timer_start = false;

display_text = true;

prevent_time = false;

mytime = 29;

translateY_counter = 1;

function html_loader(j) {
  $("#text").html(null);
  textArray = [];

  previous_random_number = 0
  for (i = 0; i < j; i++) {
    r = Math.floor(Math.random() * 100);
    if(previous_random_number==r){
      r=r+Math.floor(Math.random() * 99)
    }

    $("#text").append(
      "<span class='test_words' id='" + i + "'>" + dictionary[r] + "</span>"
    );
    $("#text").append(" ");

    textArray.push(dictionary[r]);
  }

  $("#0").addClass("current_word");
  $("#textInput").focus();
  $("#textInput").css("width", textArray[0].length * 18 + "px");
}

function result_reveal(element) {
  const counters = document.querySelectorAll(element);
  const speed = 100;

  counters.forEach((counter) => {
    const animate = () => {
      const value = +counter.getAttribute("result");
      const data = +counter.innerText;

      const time = value / speed;
      if (data < value) {
        counter.innerText = Math.ceil(data + time);
        setTimeout(animate, 1);
      } else {
        counter.innerText = value;
      }
    };

    animate();
  });
}

function setCookie(c_name, c_value, exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  document.cookie =
    encodeURIComponent(c_name) +
    "=" +
    encodeURIComponent(c_value) +
    (!exdays ? "" : "; expires=" + exdate.toUTCString());
}

function time_toggle_to_60() {
  setCookie("time", 60, 365);
  mytime = 59;
  $(".toggle_60").removeClass("display_none");
  $(".toggle_30").addClass("display_none");
  $(".p_60s").addClass("highlight");
  $(".p_30s").removeClass("highlight");
  $("#textInput").focus();
}

function time_toggle_to_30() {
  setCookie("time", 30, 366);
  mytime = 29;
  $(".toggle_30").removeClass("display_none");
  $(".toggle_60").addClass("display_none");
  $(".p_30s").addClass("highlight");
  $(".p_60s").removeClass("highlight");
  $("#textInput").focus();
}

function current_word_blinker() {
  if (!$("#textInput").val() == "" || !$("#textInput").val() == " ") {
    $(".current_word").css("animation", "none");
  } else {
    $(".current_word").css(
      "animation",
      "1500ms current_word_blinker ease infinite"
    );
  }
}

function line_scroll() {
  $("#text").css(
    "transform",
    "translateY(-" +
      parseInt($("#text").css("line-height"), 10) * translateY_counter +
      "px)"
  );
  translateY_counter++;
}

function text_input_reactor() {
  if (window_less_than_425 && window_less_than_800) {
    if (textArray[word_count].length < 3) {
      $("#textInput").css("width", textArray[word_count].length * 14 + "px");
    } else {
      $("#textInput").css("width", textArray[word_count].length * 14 + "px");
    }
    new_text_input_position = text_input_position+1
    $("#textInput").css(
      "transform",
      "translateX(" + new_text_input_position + "px)"
    );  
    
  } else {
    if (textArray[word_count].length < 3) {
      $("#textInput").css("width", textArray[word_count].length * 18 + "px");
    } else {
      $("#textInput").css("width", textArray[word_count].length * 16 + "px");
    }
    $("#textInput").css(
      "transform",
      "translateX(" + text_input_position + "px)"
    );
  }
}

// function for the timer
function startTimer(duration, display) {
  var timer = duration;

  timer_function = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = seconds;

    if (--timer < 0) {
      display.textContent = "";

      $(".text").addClass("display_none");

      // double the result to get wpm
      if (mytime == 29) {
        correct_word = correct_word * 2;
        word_count = word_count * 2;
      }

      // accuracy formula
      accuracy =
        ((100 * correct_word) / word_count +
          (100 * keystrokes_needed) / keystrokes) /
        2;

      $(".result").removeClass("display_none");

      // showing result
      if (correct_word > 0) {
        $("#speed").attr("result", correct_word);
        $("#accuracy").attr("result", accuracy.toFixed(2));
        result_reveal(".result_num");
      } else {
        $(".speed").text("The test was invalid,");
        $(".accuracy").text("please try again.");
      }

      display_text = false;
      timer_start = false;

      clearInterval(timer_function);
    }
  }, 1000);
}

$(document).ready(function () {
  if ($(window).width() >= 800) {
    window_less_than_800 = false;
    window_less_than_425 = false;
  } else if ($(window).width() < 800) {
    window_less_than_800 = true;
    window_less_than_425 = false;
    if ($(window).width() <= 425) {
      window_less_than_425 = true;
      window_less_than_800 = true;
    }
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${"time"}=`);
  test_time = 0;
  if (parts.length === 2) {
    test_time = parts.pop().split(";").shift();
  }
  if (test_time == 30) {
    time_toggle_to_30();
  } else if (test_time == 60) {
    time_toggle_to_60();
  } else {
    time_toggle_to_30();
  }

  html_loader(300);
});

$(window).on("resize", function () {
  var win = $(this);

  if (win.width() <= 800 && !window_less_than_800) {
    window_less_than_800 = true;
    window_less_than_425 = false;

    if (timer_start) {
      display = document.querySelector("#time_one");
      time = $("#time_two").text();
      $("#time_one").html(time);
      clearInterval(timer_function);
      startTimer(time - 1, display);
      $("#time_two").text("");
    }
  } else if (win.width() > 800 && window_less_than_800) {
    window_less_than_800 = false;
    window_less_than_425 = false;
    if (timer_start) {
      display = document.querySelector("#time_two");
      time = $("#time_one").text();
      $("#time_two").html(time);
      clearInterval(timer_function);
      startTimer(time - 1, display);
      $("#time_one").text("");
    }
  } else if (win.width() <= 425 && !window_less_than_425) {
    window_less_than_425 = true;
  }
});

$(".time_toggle").click(function () {
  if (mytime == 29) {
    time_toggle_to_60();
  } else {
    time_toggle_to_30();
  }
});

$(".redo_button").click(function () {
  if (timer_start || !display_text) {
    $("#time_one").text("");
    $("#time_two").text("");
    $(".text").removeClass("display_none");
    $(".result").addClass("display_none");
    $(".result_num").text(0);
    $("#textInput").val(null);
    $("#textInput").css("transform", "translateX(0px)");
    $(".time_settings").removeClass("display_none");
    $("#redo_button p").text("shuffle");

    // new words
    html_loader(300);

    if (translateY_counter > 1) {
      $("#text").css("transform", "translateY(0px)");
      translateY_counter = 1;
    }

    display_text = true;
    word_count = 0;
    correct_word = 0;
    wrong_word = 0;
    keystrokes = 0;
    keystrokes_needed = 0;
    wrong = false;
    timer_start = false;

    clearInterval(timer_function);
  } else {
    html_loader(300);
  }
});

$(document).click(function () {
  if (!$("#textInput").is(":focus")) {
    $(".current_word").css("animation", "none");
    $("#" + word_count).removeClass("current_word");
    if (wrong) {
      $("#" + word_count).removeClass("wrong_warning");
    }
  }
});

$("#text").click(function () {
  if (!$("#textInput").is(":focus")) {
    $("#textInput").focus();
    $("#" + word_count).addClass("current_word");
    if (wrong) {
      $("#" + word_count).addClass("wrong_warning");
    }
    current_word_blinker();
  }
});

$("#textInput").click(function () {
  $("#" + word_count).addClass("current_word");
  if (wrong) {
    $("#" + word_count).addClass("wrong_warning");
  }
  current_word_blinker();
});

function space_click_on_test(){
  if ($("#textInput").val() == "" || $("#textInput").val() == " ") {
    event.preventDefault();
    $("#textInput").val(null);
  } else {  
    $("#" + word_count).removeClass("current_word");
    $("#" + word_count).addClass("correct");
    $("#" + word_count).removeClass("wrong_warning");
    $("#" + word_count).removeClass("correct_warning");

    if (wrong || entered_value.length < current_word.length) {
      $("#" + word_count).removeClass("correct");
      $("#" + word_count).addClass("red");
      wrong_word++;
      correct_word--;
    }
    keystrokes_needed += current_word.length;
    correct_word++;
    word_count++;
    wrong = false;

    current_word_position =
      $("#" + word_count).offset().left -
      $("#" + word_count)
        .parent()
        .offset().left;

    text_input_position = current_word_position - 8;

    if (current_word_position == 5) {
      line_scroll(translateY_counter);
    }

    $("#textInput").val(null);
    text_input_reactor();
    $("#" + word_count).addClass("current_word");
    current_word_blinker();
  }
}

$("#textInput").keyup(function (event) {
  entered_value = $("#textInput").val().replace(/\s/g, "");
  current_word = textArray[word_count];
  pressed_key = String($("#textInput").val().slice(-1)).charCodeAt(0);

  if (prevent_time) {
    prevent_time = false;
  }

  if (
    event.keyCode == 9 ||
    event.keyCode == 13 ||
    event.keyCode == 27 ||
    event.keyCode == 45 ||
    event.keyCode == 144 ||
    event.keyCode == 145 ||
    event.keyCode == 186 ||
    event.keyCode == 32 ||
    event.keyCode == 8 ||
    event.keyCode == 46 ||
    (event.keyCode >= 16 && event.keyCode <= 20) ||
    (event.keyCode >= 33 && event.keyCode <= 40) ||
    (event.keyCode >= 91 && event.keyCode <= 93) ||
    (event.keyCode >= 112 && event.keyCode <= 123)
  ) {
    if (!timer_start) {
      prevent_time = true;
      keystrokes--;
    }
  }

  if (!timer_start && display_text && !prevent_time) {
    if (window_less_than_800) {
      $("#time_one").text(mytime + 1);
      display = document.querySelector("#time_one");
    } else {
      $("#time_two").text(mytime + 1);
      display = document.querySelector("#time_two");
    }
    $("#redo_button p").text("restart");
    timer_start = true;
    $(".time_settings").addClass("display_none");
    startTimer(mytime, display);
  }


  if (pressed_key == 32 || event.keyCode == 32) {
    space_click_on_test()
  }else{
    keystrokes++
    if (
      entered_value != current_word.slice(0, entered_value.length) &&
      event.keyCode != 32
    ) {
      $("#" + word_count).removeClass("correct_warning");
      $("#" + word_count).addClass("wrong_warning");
      wrong = true;
    } else if (
      wrong &&
      current_word.slice(0, entered_value.length) == entered_value
    ) {
      $("#" + word_count).removeClass("wrong_warning");
      wrong = false;
      if (entered_value == current_word) {
        $("#" + word_count).addClass("correct_warning");
      }
      current_word_blinker();
    } else if (entered_value == current_word && event.keyCode != 32) {
      $("#" + word_count).addClass("correct_warning");
    } else if (entered_value.length < current_word.length) {
      $("#" + word_count).removeClass("correct_warning");
      current_word_blinker();
    }  
  }
  current_word_blinker();
});

$("#textInput").keydown(function (event){
  entered_value = $("#textInput").val().replace(/\s/g, "");
  current_word = textArray[word_count];
  pressed_key = String($("#textInput").val().slice(-1)).charCodeAt(0);

  if (pressed_key == 32 || event.keyCode == 32) {
    space_click_on_test()
  }

})
