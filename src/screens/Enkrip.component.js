import React from "react";
import { ScrollView, RefreshControl } from "react-native";
//
import { View, Clipboard, Share } from "react-native";
import RNRestart from "react-native-restart";
import { Button, Input } from "react-native-elements";
//
import { ButtonApp, CheckBoxApp, ValueApp } from "../components";
import { dataRadio } from "../models";

const Enkrip = (props) => {
  //
  const [sIndex, setIndex] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [inputPlainText, setPlainText] = React.useState('');
  const [inputKeyword, setKeyword] = React.useState('');
  const [outputText, setOutput] = React.useState('');
  //
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    RNRestart.Restart();
  }, []);
  //
  const shareValue = () => {
    Share.share({
      message : `Chiper Text :\n${outputText.toUpperCase()}\nKey :\n${inputKeyword.toUpperCase()}\n\n[Teknik Enkripsi App By KhistyNH]`,
    }).then((result)=> console.log(result)).catch((errorMsg)=>console.log(errorMsg));
  } 
  //
  const onSubmitKlik = () => {
    let method = dataRadio[sIndex].text;
    if (inputPlainText.length && inputKeyword.length) onInputReady(method);
    else if (!inputPlainText.length) alert('Plain Text Harap Diisi!!');
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
  const onInputReady = (method) => { 
    if (inputKeyword.length && inputPlainText.length) {
      let key = inputKeyword.toUpperCase();
      let text = inputPlainText.toUpperCase();
      let encrypted = "";
      if (method == 'Vignere Chiper') {
        let j = 0;
        for (let i = 0; i < text.length; i++) {
          let currentLetter = text[i];
          const A = 65;
    
          if (isUpperCase(currentLetter)) {
            let Pl = (currentLetter.charCodeAt(0) - A);
            let Ki = (key[j % key.length].charCodeAt() - A);
            let upperLatter = mod(Pl + Ki, 26);
  
            encrypted += String.fromCharCode(upperLatter + A);
  
            j++;
          } else {
            encrypted += currentLetter;
          }
  
        } 
      } else if(method == 'Row Transfortation') {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let pc = "-";
        var klen = key.length;
        if (pc == "") pc = "-";
        while (text.length % klen != 0) { //loop column sesuai jml kunci
            text += pc.charAt(0);
        }
        
        var colLength = text.length / klen; // 10/5 = 2
        var k = 0;
        for (let i = 0; i < klen; i++) { //loop sebanyak column
            
            while (k < 26) {
                var t = key.indexOf(chars.charAt(k)); // colum  urutan alfabet key,
                var arrkw = key.split("");
                arrkw[t] = "_";
                key = arrkw.join("");
                // console.log(key);
                if (t >= 0) break;
                else k++;
            }

            for (let j = 0; j < colLength; j++) {
               encrypted += text.charAt(j * klen + t); // 0 * 5 + 3
            }
        }
      } else {
        alert('Method Tidak Di Temukan');
      }        
      setOutput(encrypted);
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
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Input placeholder="Plain Text" onChangeText={(value) => setPlainText(value)} value={inputPlainText.toUpperCase()} />
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
        <ValueApp value={outputText} title={"Chiper Text"} />
        <ButtonApp title={"Copy Text"} onPress={() => Clipboard.setString(outputText)} />
        {/* <ButtonApp title={"Share"} onPress={shareValue}  buttonStyle={{marginTop:30,}} /> */}
        <Button title={"Share"} onPress={shareValue} buttonStyle={{paddingVertical: 10, backgroundColor: "blue",marginTop:30,}} containerStyle={{width: "100%",paddingHorizontal: 10,}}/>
      </ScrollView>
    </View>
  );
};

export default Enkrip;
