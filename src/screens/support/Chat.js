import React, { useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, RefreshControl } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import mainRouts from "../../navigation/routs/mainRouts";
import endpoints from "../../../assets/endpoints/endpoints";
import io from 'socket.io-client';


export default Chat = ({ navigation }) => {
    const { colorScheme, user, token } = useContext(AuthContext)

    const [chats, setChats] = React.useState([])
    const [processing, setProcessing] = React.useState(false)
    const [newChat, setNewChat] = React.useState({})
    const [chat, setChat] = React.useState({
        type: 'text',
        content: ''
    })

    // //setup to socket
    const socket = io(endpoints.socketUrl, {
        // extraHeaders: {
        //     authorization: `Bearer ${token}`,
        // },
    });

    //connect socket
    useEffect(() => {
        // if (coordinate.latitude !== 0 && coordinate.longitude !== 0) {
        socket.on('connect', e => {
            console.log('connected', socket.connected);
            socket.emit('supportuser', {
                userid: user.id
            })
        });

        socket.on('disconnect', e => {
            console.log('disconnected', socket.connected);
        });
        // }
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            // socket.off('receiveAlerts');
        };
    }, []);

    const sendChat = () => {
        console.log('sendChat', chat);
        socket.emit('send_dispatch_support', {
            "userid": user.id,
            "type": chat.type,
            "usertype": "dispatch",
            "text": chat.content
        })
        setChats([...chats, {
            "type": chat.type,
            "usertype": "dispatch",
            "text": chat.content,
            createdAt: new Date().toISOString()
        }])
        setChat({
            type: 'text',
            content: ''
        })
    }
    useEffect(() => {
        socket.on('receieve_dispatch_support', (data) => {
            setNewChat(data)
        });
        return () => {
            socket.off('receieve_dispatch_support');
        };
    }, [])

    useEffect(() => {
        if (Object.keys(newChat).length > 0) {
            // console.log('lastChats', chats);
            console.log('receieve_dispatch_support', [...chats, newChat]);
            const prev = [...chats]
            //check if last chat is from dispatch
            if (prev.length > 0 && prev[prev.length - 1].usertype === 'dispatch') {
                //remove last chat
                prev.pop()
            }
            setChats([...prev, newChat])
        }
    }, [newChat])

    const getChats = () => {
        setProcessing(true)
        fetch(endpoints.baseUrl + endpoints.chat, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                dispatchid: user?.id,
            }),
        }).then(res => res.json())
            .then(resJson => {
                // console.log('resJson', resJson.data)
                setProcessing(false)
                if (Array.isArray(resJson.data)) {
                    setChats(resJson.data)
                }
            })
            .catch(err => {
                setProcessing(false)
                console.log('err', err)
            })
    }

    useEffect(() => {
        getChats()
    }, [])
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors[colorScheme].background,
        }}>
            <View style={{
                backgroundColor: colors[colorScheme].primary,
                padding: 20,
                paddingBottom: 30,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
            }}>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: colors[colorScheme].white,
                        fontSize: 24,
                        fontFamily: 'Inter-Bold',
                        alignSelf: 'center',
                    }}>Message</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity style={{
                            marginEnd: 10,
                        }}
                            onPress={() => navigation.goBack()}>
                            <Image
                                source={require('../../../assets/images/back.png')}
                                style={{
                                    width: 24,
                                    height: 24,
                                    resizeMode: "contain",
                                    tintColor: colors[colorScheme].white,
                                }}
                            />
                        </TouchableOpacity>
                        <Image
                            source={user.photo?.length > 0 ? { uri: user.photo } : require('../../../assets/images/user.png')}
                            style={{
                                width: 40,
                                height: 40,
                                resizeMode: "cover",
                                borderRadius: 40,
                            }}
                        />
                        <View>
                            <Text style={{
                                color: colors[colorScheme].white,
                                fontSize: 16,
                                fontFamily: 'Inter-Bold',
                                marginStart: 10,
                            }}>{user.name}</Text>
                            <Text style={{
                                color: colors[colorScheme].white,
                                fontSize: 12,
                                fontFamily: 'Inter-Regular',
                                marginStart: 10,
                            }}>Online</Text>
                        </View>
                    </View>
                </View>
            </View>


            <FlatList
                automaticallyAdjustKeyboardInsets
                inverted
                extraData={chats}
                refreshControl={
                    <RefreshControl
                        refreshing={processing}
                        onRefresh={getChats}
                    />
                }
                data={[...chats].reverse()}
                // keyExtractor={item => item}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            marginVertical: 5,
                            justifyContent: item.usertype === 'admin' ? 'flex-start' : 'flex-end',
                        }}>

                            <View style={{
                                alignItems: item.usertype === 'admin' ? 'flex-start' : 'flex-end',
                            }}>
                                <Text style={{
                                    color: colors[colorScheme].textGray,
                                    fontSize: 12,
                                    fontFamily: 'Inter-Regular',
                                }}>{new Date(item.createdAt).toLocaleString()}</Text>
                                <View style={{
                                    backgroundColor: item.usertype === 'admin' ? colors[colorScheme].secondary : colors[colorScheme].primary,
                                    padding: 10,
                                    borderRadius: 10,
                                    borderBottomStartRadius: item.usertype === 'admin' ? 0 : 10,
                                    borderBottomEndRadius: item.usertype === 'admin' ? 10 : 0,
                                    marginTop: 4,
                                    maxWidth: '80%',
                                    minWidth: 150,
                                }}>
                                    <Text style={{
                                        color: item.usertype === 'admin' ? colors[colorScheme].black : colors[colorScheme].white,
                                        fontSize: 16,
                                        fontFamily: 'Inter-Regular',
                                    }}>{item?.text}</Text>
                                </View>
                                <Text style={{
                                    color: colors[colorScheme].textGray,
                                    fontSize: 12,
                                    fontFamily: 'Inter-Regular',
                                }}>{item?._id ? 'sent' : 'sending'}</Text>
                            </View>
                        </View>
                    )
                }}
            />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 10,
            }}>
                <View style={{
                    // backgroundColor: 'rgba(217,217,217,0.05)',
                    borderRadius: 10,
                    flex: 1,
                    marginEnd: 10,
                    // flexDirection: 'row',
                    alignItems: 'center',
                    // paddingHorizontal: 10,
                }}>
                    <TextInput
                        placeholder="Type a message"
                        placeholderTextColor={colors[colorScheme].textGray}
                        cursorColor={colors[colorScheme].textDark}
                        style={{
                            padding: 10,
                            backgroundColor: 'rgba(217,217,217,0.05)',
                            borderRadius: 10,
                            fontFamily: 'Inter-Regular',
                            width: '100%',
                            color: colors[colorScheme].textDark,
                        }}
                        value={chat.content}
                        onChangeText={text => setChat({ ...chat, content: text })}
                    />
                </View>

                <TouchableOpacity
                    onPress={sendChat}
                    disabled={chat.content.length === 0}
                    style={{
                        backgroundColor: colors[colorScheme].primary,
                        padding: 10,
                        borderRadius: 10,
                    }}>
                    <Image
                        source={require('../../../assets/images/send.png')}
                        style={{
                            width: 24,
                            height: 24,
                            resizeMode: "contain",
                            tintColor: colors[colorScheme].white
                        }}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}