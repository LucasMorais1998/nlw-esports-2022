import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context/lib/typescript/SafeAreaView";

import logoImg from "../../assets/logo-nlw-esports.png";

import { Background } from "../../components/Background";
import { GameCard, IGameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";

const Home = () => {
  const [games, setGames] = useState<IGameCardProps[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://192.198.0.1:3333/games`);

        const data = await response.json();

        setGames(data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const handleOpenGaming = ({ id, title, bannerUrl }: IGameCardProps) => {
    navigation.navigate("game", { id, title, bannerUrl });
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGaming(item)} />
          )}
          showsHorizontalScrollIndicator
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
};

export { Home };
