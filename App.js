import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'

export default class App extends React.Component {
constructor(){
super();
this.state={imgSrc:'./assets/favicon.png '}
}

//  fetchImage=(imgName)=>{
//     var storageRef=firebase.storage().ref().child("user_profile/"+imgName)
//     storageRef.getDownloadURL().then(
//       url=>{
//         this.setState({
//           imgSrc:url
//         })
//       }
//     )
//     .catch((error)=>{
//       this.setState({
//         imgSrc:"./assets/favicon.png "
//       })
//     })
//   }

//   uploadImage=async(uri,imgName)=>{
//     var response=await fetch(uri)
//     var blob=await response.blob()
//     var ref=firebase.storage().ref().child("user_profile/"+imgName)
//     return(ref.put(blob).then(response=>{
//       this.fetchImage(imgName)
//     })
//     )
//   }
useEffect=() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    });
  };

   selectImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
this.setState({imgSrc:result.uri})
      // uploadImage(result.uri,this.state.userId);
    }
  };

render(){
  return (
    <View style={styles.container} >

      <Avatar rounded source={
        { uri: this.state.imgSrc }}
        size="medium"
        onPress={
          () => {
            this.selectImg()
          }
        }
        showEditButton
      />
    </View>

  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});