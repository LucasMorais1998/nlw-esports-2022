import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logoImg from "../../assets/logo-nlw-esports.png";

import { THEME } from "../../theme";
import { styles } from "./styles";

import { IGameParams } from "../../@types/navigation";

import { Background } from "../../components/Background";
import { DuoCard, IDuoCardProps } from "../../components/DuoCard";
import { Heading } from "../../components/Heading";

const Game = () => {
  const [duos, setDuos] = useState<IDuoCardProps[]>([]);

  const navigation = useNavigation();
  const router = useRoute();
  const game = router.params as IGameParams;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://192.198.0.1:3333/games/${game.id}/ads`
        );

        const data = await response.json();

        setDuos(data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={24}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          }
        />
      </SafeAreaView>
    </Background>
  );
};

export { Game };
