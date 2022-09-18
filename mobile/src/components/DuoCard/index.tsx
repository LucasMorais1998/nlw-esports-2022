import { GameController } from "phosphor-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { THEME } from "../../theme";

import { DuoInfo } from "../DuoInfo";

import { styles } from "./styles";

export interface IDuoCardProps {
  id: string;
  hourStart: string;
  hourEnd: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface IPros {
  data: IDuoCardProps;
  onConnect: () => void;
}

const DuoCard = ({ data, onConnect }: IPros) => {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />

      <DuoInfo
        label="Tempo de jogo"
        value={
          data.yearsPlaying > 1
            ? `${data.yearsPlaying} anos`
            : `${data.yearsPlaying} ano`
        }
      />

      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label="Chamada de áudio"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={onConnect}
      >
        <GameController 
          color={THEME.COLORS.TEXT} 
          size={20} 
        />

        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
};

export { DuoCard };
