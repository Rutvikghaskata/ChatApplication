import {
    StyleSheet,
    StatusBar,
    View,
    Animated,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
  } from 'react-native';
  import React, {useState} from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import CheckBox from 'react-native-check-box';
  
  const App = () => {
    const Container = React.useRef(new Animated.Value(450)).current;
    const Header = React.useRef(new Animated.Value(0)).current;
    const Info = React.useRef(new Animated.Value(0)).current;
    const Button = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      Animated.timing(Container, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start();
  
      setTimeout(() => {
        Animated.timing(Header, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, 1500);
      setTimeout(() => {
        Animated.timing(Info, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, 2500);
      setTimeout(() => {
        Animated.timing(Button, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, 3500);
    }, [Header, Info, Button]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    return (
      <>
        <StatusBar hidden />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  marginRight: '2%',
                }}
                activeOpacity={0.9}
                onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="close" size={22} color="#000" />
              </TouchableOpacity>
              <Text style={styles.HeaderText}>Terms and Conditions</Text>
              <ScrollView style={{height: '95%', marginTop: 10}}>
                <Text style={styles.detailText}>
                  Introduction These Website Standard Terms and Conditions written
                  on this webpage shall manage your use of our website, Webiste
                  Name accessible at Website.com. These Terms will be applied
                  fully and affect to your use of this Website. By using this
                  Website, you agreed to accept all terms and conditions written
                  in here. You must not use this Website if you disagree with any
                  of these Website Standard Terms and Conditions. Minors or people
                  below 18 years old are not allowed to use this Website.
                  Intellectual Property Rights Other than the content you own,
                  under these Terms, Company Name and/or its licensors own all the
                  intellectual property rights and materials contained in this
                  Website. You are granted limited license only for purposes of
                  viewing the material contained on this Website. Restrictions You
                  are specifically restricted from all of the following:
                  publishing any Website material in any other media; selling,
                  sublicensing and/or otherwise commercializing any Website
                  material; publicly performing and/or showing any Website
                  material; using this Website in any way that is or may be
                  damaging to this Website; using this Website in any way that
                  impacts user access to this Website; using this Website contrary
                  to applicable laws and regulations, or in any way may cause harm
                  to the Website, or to any person or business entity; engaging in
                  any data mining, data harvesting, data extracting or any other
                  similar activity in relation to this Website; using this Website
                  to engage in any advertising or marketing. Certain areas of this
                  Website are restricted from being access by you and Company Name
                  may further restrict access by you to any areas of this Website,
                  at any time, in absolute discretion. Any user ID and password
                  you may have for this Website are confidential and you must
                  maintain confidentiality as well. Your Content In these Website
                  Standard Terms and Conditions, “Your Content” shall mean any
                  audio, video text, images or other material you choose to
                  display on this Website. By displaying Your Content, you grant
                  Company Name a non-exclusive, worldwide irrevocable, sub
                  licensable license to use, reproduce, adapt, publish, translate
                  and distribute it in any and all media. Your Content must be
                  your own and must not be invading any third-party's rights.
                  Company Name reserves the right to remove any of Your Content
                  from this Website at any time without notice. No warranties This
                  Website is provided “as is,” with all faults, and Company Name
                  express no representations or warranties, of any kind related to
                  this Website or the materials contained on this Website. Also,
                  nothing contained on this Website shall be interpreted as
                  advising you. Limitation of liability In no event shall Company
                  Name, nor any of its officers, directors and employees, shall be
                  held liable for anything arising out of or in any way connected
                  with your use of this Website whether such liability is under
                  contract. Company Name, including its officers, directors and
                  employees shall not be held liable for any indirect,
                  consequential or special liability arising out of or in any way
                  related to your use of this Website. Indemnification You hereby
                  indemnify to the fullest extent Company Name from and against
                  any and/or all liabilities, costs, demands, causes of action,
                  damages and expenses arising in any way related to your breach
                  of any of the provisions of these Terms. Severability If any
                  provision of these Terms is found to be invalid under any
                  applicable law, such provisions shall be deleted without
                  affecting the remaining provisions herein. Variation of Terms
                  Company Name is permitted to revise these Terms at any time as
                  it sees fit, and by using this Website you are expected to
                  review these Terms on a regular basis. Assignment The Company
                  Name is allowed to assign, transfer, and subcontract its rights
                  and/or obligations under these Terms without any notification.
                  However, you are not allowed to assign, transfer, or subcontract
                  any of your rights and/or obligations under these Terms. Entire
                  Agreement These Terms constitute the entire agreement between
                  Company Name and you in relation to your use of this Website,
                  and supersede all prior agreements and understandings. Governing
                  Law & Jurisdiction These Terms will be governed by and
                  interpreted in accordance with the laws of the State of Country,
                  and you submit to the non-exclusive jurisdiction of the state
                  and federal courts located in Country for the resolution of any
                  disputes.
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <View style={{flex: 1}}>
          <LinearGradient
            colors={['#872ba3', '#28056a']}
            style={styles.linearGradient}>
            <Animated.View
              style={[styles.container, {transform: [{translateY: Container}]}]}>
              <View
                style={{
                  height: 5,
                  width: 70,
                  backgroundColor: '#ccc',
                  borderRadius: 5,
                  alignSelf: 'center',
                  marginVertical: 10,
                }}></View>
              <Animated.Text
                style={{
                  fontSize: 25,
                  color: 'black',
                  fontFamily: 'Quicksand-SemiBold',
                  alignSelf: 'center',
                  opacity: Header,
                }}>
                Information
              </Animated.Text>
              <Animated.Text
                style={{
                  width: '80%',
                  textAlign: 'justify',
                  alignSelf: 'center',
                  marginTop: 20,
                  fontFamily: 'Quicksand-Medium',
                  opacity: Info,
                  color: 'gray',
                }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Animated.Text>
              <Animated.View
                style={{
                  opacity: Button,
                  flexDirection: 'row',
                  marginTop: 20,
                  marginLeft: 35,
                  alignItems: 'center',
                }}>
                <CheckBox
                  onClick={() => {
                    setIsChecked(!isChecked);
                  }}
                  isChecked={isChecked}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    color: 'grey',
                    justifyContent: 'center',
                    fontFamily: 'Quicksand-Medium',
                  }}>
                  I Agree
                </Text>
                <TouchableOpacity style={{marginLeft: 5}} onPress={() => setModalVisible(true)}>
                  <Text style={{color: 'black',fontFamily: 'Quicksand-Bold',}}>
                    Terms and Conditions
                  </Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{opacity: Button}}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={{
                    height: 50,
                    width: '80%',
                    alignSelf: 'center',
                    marginTop: 20,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  <LinearGradient
                    colors={['#872ba3', '#28056a']}
                    style={styles.btn}>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 20,
                        color: '#fff',
                        fontFamily: 'Quicksand-SemiBold',
                      }}>
                      GET START
                    </Text>
                    <AntDesign
                      name="right"
                      size={22}
                      color="#fff"
                      style={{marginTop: 5, marginLeft: 10}}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </LinearGradient>
        </View>
      </>
    );
  };
  
  export default App;
  
  const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      opacity: 1,
      justifyContent: 'flex-end',
    },
    container: {
      height: 450,
      width: '100%',
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    btn: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: 15,
    },
    modalView: {
      width: '100%',
      height: '100%',
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 10,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    HeaderText: {
      color: '#000',
      fontWeight: '600',
      fontSize: 20,
    },
    detailText: {
      textAlign: 'justify',
    },
  });
  