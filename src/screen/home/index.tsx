import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { style } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "../../global/color";
import { IconCloud } from "../../components/icon-cloud";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [params, setParams] = useState("");
  const [errorInput, setErrorInput] = useState("");

  const handleSuccess = () => {
    navigation.navigate("City", { params });
    setErrorInput("");
    setParams("");
  };

  const handleText = () => {
    const checkInput = {
      0: "Por favor precisa inserir algo no campo",
      1: "Por favor precisa digitar mais que apenas 1 letra",
      2: "Por favor precisa digitar mais que apenas 2 letras",
      3: "Por favor precisa digitar mais que apenas 3 letras",
      4: "Por favor precisa digitar mais que apenas 4 letras",
    } as unknown as string;
    const getCheckInput = (text: number) => {
      return checkInput[text]
        ? setErrorInput(checkInput[letterNumber])
        : handleSuccess();
    };
    const letterNumber = params.length;
    return getCheckInput(letterNumber);
  };

  return (
    <View style={style.container}>
      <View style={style.viewHeader}></View>
      <Text style={style.errorInput}>{errorInput && errorInput}</Text>
      <View style={style.viewMain}>
        <Text style={style.textProps}>
          Escreva o nome da cidade que deseja pesquisar
        </Text>
        <MaterialIcons
          style={style.iconMain}
          name="search"
          size={24}
          color="black"
        />
        <TextInput
          placeholder="Cidade que deseja pesquisar"
          placeholderTextColor={color.with}
          style={style.textInput}
          autoFocus
          maxLength={30}
          value={params}
          onChangeText={setParams}
        />
        <RectButton onPress={handleText} style={style.buttonFooter}>
          <Text style={style.texFooter}>✔</Text>
        </RectButton>
      </View>
    </View>
  );
};
