import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { THEME } from "../../theme";
import { styles } from "./styles";

export interface IGameCardProps {
  id: string;
  title: string;
  _count: {
    ads: number;
  };
  bannerUrl: string;
}

interface IProps extends TouchableOpacityProps {
  data: IGameCardProps;
}

const GameCard = ({ data, ...rest }: IProps) => {
  return (
    <TouchableOpacity>
      <ImageBackground style={styles.cover} source={{ uri: data.bannerUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{data.title}</Text>

          <Text style={styles.ads}>{data._count.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export { GameCard };
