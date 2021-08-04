import React from "react";
import { ScrollView } from "react-native";
//
import { View, Clipboard } from "react-native";
import { Button, Input } from "react-native-elements";
//
import { ButtonApp, CheckBoxApp, ValueApp } from "../components";
import { dataRadio } from "../models";

const Dekrip = (props) => {
  //
  const [sIndex, setIndex] = React.useState(0);
  const [inputChiperText, setChiperText] = React.useState('');
  const [inputKeyword, setKeyword] = React.useState('');
  const [outputText, setOutput] = React.useState('');
  //const [copySuccess, setCopySuccess] = React.useState('');
  
  //
  const onSubmitKlik = () => {
    let method = dataRadio[sIndex].text;
    if (inputChiperText.length && inputKeyword.length) onInputReady(method);
    else if (!inputChiperText.length) alert('Chiper Text Harap Diisi!!');
    else if (!inputKeyword.length) alert('Keyword Harap Diisi!!');
    onInputReady(method);
  }
  //
  const mod = (n,m) => {
    return ((n % m) + m) % m;
  }
  //
  const isUpperCase = (letter) => {
    var l = letter.charCodeAt();
    if (l > 64 && l < 91) {
      return true;
    } else {
      return false;
    }
  }
  //
  // const copyToClipboard = (e) => {
  //   navigator.clipboard.writeText(outputText);
   
  //   // e.target.focus();
  //   // setCopySuccess('Disalin!');
  // };
  //
  const onInputReady = (method) => { 
    if (inputKeyword.length && inputChiperText.length) {
        let key = inputKeyword.toUpperCase();
        let text = inputChiperText.toUpperCase();
        let decrypted = "";
        if (method == 'Vignere Chiper') {
          let j = 0;
          for (let i = 0; i < text.length; i++) {
            let currentLetter = text[i];
            const A = 65;
      
            if (isUpperCase(currentLetter)) {
              let Pl = (currentLetter.charCodeAt(0) - A);
              let Ki = (key[j % key.length].charCodeAt() - A);
              let upperLatter = mod(Pl - Ki, 26);
    
              decrypted += String.fromCharCode(upperLatter + A);
    
              j++;
            } else {
              decrypted += currentLetter;
            }
          } 
        } else if(method == 'Row Transfortation') {
          var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          var klen = key.length;
          // if (klen <= 1) {
          //     alert("keyword should be at least 2 characters long");
          //     return;
          // }

          // first we put the text into columns based on keyword length
          var cols = new Array(klen);
          var colLength = text.length / klen;
          for (let i = 0; i < klen; i++) cols[i] = text.substr(i * colLength, colLength);
          
          // now we rearrange the columns so that they are in their unscrambled state
          var newcols = new Array(klen);
          var j = 0;
          var i = 0;
          while (j < klen) {
              var t = key.indexOf(chars.charAt(i));
              if (t >= 0) {
                  newcols[t] = cols[j++];
                  var arrkw = key.split("");
                  arrkw[t] = "_";
                  key = arrkw.join("");
              } else i++;
          }

          for (let i = 0; i < colLength; i++) {
              for (let j = 0; j < klen; j++) {
                  decrypted += newcols[j].charAt(i);
              }
          }
          decrypted = decrypted.replace(/-/g, '');
        } else {alert('Method Tidak Di Temukan');}
         
      setOutput(decrypted);
    } else {
      setOutput('');
    }
  }
  //
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input placeholder="Chiper Text" onChangeText={(value) => setChiperText(value)} value={inputChiperText.toUpperCase()} />
        {dataRadio.map((e, index) => {
          return (
            <CheckBoxApp
              key={index}
              title={e.text}
              checked={sIndex == index ? true : false}
              onPress={() => setIndex(index)}
            />
          );
        })}
        {dataRadio[sIndex].keyword ? (
          <Input placeholder="Key" onChangeText={(value) => setKeyword(value)} value={inputKeyword.toUpperCase()} />
        ) : (
          <View
            style={{
              marginVertical: 10,
            }}
          />
        )}
        <ButtonApp onPress={onSubmitKlik} />
        <ValueApp value={outputText} title={"Plain Text"} />
        <ButtonApp title={"Copy Text"} onPress={() => Clipboard.setString(outputText)} />
      </ScrollView>
    </View>
  );
};

export default Dekrip;
