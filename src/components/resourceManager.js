
import Reactotron from 'reactotron-react-native';

// requiring images needs hardcoded paths, no dynamic generation of URIs.  So we need to manually map every page to its images and sound effects
_resourcesByBook = [
    {
        bookId:'c08310da-aa1e-4c28-a29d-510ef4b44d97',
        coverImage: require("../../img/pages/monster/cover.png"),
        coverImageLeftHalf: require("../../img/pages/monster/cover_lefthalf.png"),
        coverImageRightHalf: require("../../img/pages/monster/cover_righthalf.png"),
        startImage:  require("../../img/pages/monster/cover.png"),
        startAudio: 'monster_start_audio.mp3',
        startSoundEffect: 'monster_start_soundeffect.mp3',
        endImage:  require("../../img/pages/monster/end.png"),
        endAudio: 'monster_end_audio.mp3'
    },
    {
      bookId: 'a588e22d-d984-d28d-4690-d8ad87a14d63',
      coverImage: require("../../img/pages/seacreature/cover.png"),
      coverImageLeftHalf: require("../../img/pages/seacreature/cover_lefthalf.png"),
      coverImageRightHalf: require("../../img/pages/seacreature/cover_righthalf.png"),
      startImage:  require("../../img/pages/seacreature/start.png"),
      startAudio: 'seacreature_start_audio.mp3',
      startSoundEffect: 'seacreature_start_soundeffect.mp3',
      endImage:  require("../../img/pages/seacreature/end.png"),
      endAudio: 'seacreature_end_audio.mp3'
    },
    {
      bookId: 'afb09354-0bb9-72b1-45fe-7239bb8c8a62',
      coverImage: require("../../img/pages/alien/cover.png"),
      coverImageLeftHalf: require("../../img/pages/alien/cover_lefthalf.png"),
      coverImageRightHalf: require("../../img/pages/alien/cover_righthalf.png"),
      startImage:  require("../../img/pages/alien/title.png"),
      startAudio: 'alien_intro_audio.mp3',
      startSoundEffect: 'alien_title_1_soundeffect.mp3',
      endImage:  require("../../img/pages/alien/end.png"),
      endAudio: 'alien_end_audio.mp3'
    },
    {
      bookId: '94185e9e-d5b0-e0a5-4d47-485f9994a562',
      coverImage: require("../../img/pages/fairytale/cover.png"),
      coverImageLeftHalf: require("../../img/pages/fairytale/cover_lefthalf.png"),
      coverImageRightHalf: require("../../img/pages/fairytale/cover_righthalf.png"),
      startImage:  require("../../img/pages/fairytale/title.png"),
      startAudio: 'fairytale_intro_audio.mp3',
      startSoundEffect: 'fairytale_title_1_soundeffect.mp3',
      endImage:  require("../../img/pages/fairytale/end.png"),
      endAudio: 'fairytale_end_audio.mp3'
    },
    {
      bookId: 'a79381f6-455e-d78c-4c38-659e79b6caaa',
      coverImage: require("../../img/pages/dinosaur/cover.png"),
      coverImageLeftHalf: require("../../img/pages/dinosaur/cover_lefthalf.png"),
      coverImageRightHalf: require("../../img/pages/dinosaur/cover_righthalf.png"),
      startImage:  require("../../img/pages/dinosaur/title.png"),
      startAudio: 'dinosaur_intro_audio.mp3',
      startSoundEffect: 'dinosaur_title_1_soundeffect.mp3',
      endImage:  require("../../img/pages/dinosaur/end.png"),
      endAudio: 'dinosaur_end_audio.mp3'
    },
    {
      bookId: '915D33E3-109D-BCA7-4701-7FEDD4266F7C',
      coverImage: require("../../img/double_pack.png")
    },
    {
      bookId: 'DAC400B5-9135-4499-9D11-4BF95CFB5442',
      coverImage: require("../../img/triple_pack.png")
    },
    {
      bookId: '20B88B40-2426-F8A5-4923-008103C53E15',
      coverImage: require("../../img/quad_pack.png")
    },
    {
      bookId: 'B8D8EE65-E149-C58B-409F-76D712AAAD9D',
      coverImage: require("../../img/five_pack.png")
    }
]

_resourcesByPage = [
    // Monster
    {
        pageId: 'b09b639d-6e09-4d58-96e3-44b810df4170', 
        pageNumber: '1', 
        image: require('../../img/pages/monster/page1.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice2.png'),
            },
            {
                image: require('../../img/pages/monster/choice3.png'),
            }
        ]
        },
        {
        pageId: '7ff0aa4d-0c52-4b2b-b563-50e0e3764431', 
        pageNumber: '2', 
        image: require('../../img/pages/monster/page2.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice4.png'),
            },
            {
                image: require('../../img/pages/monster/choice5.png'),
            }
        ]
        },
        {
        pageId: '66ccb95d-0084-44a7-a2f1-b0e20db47f33', 
        pageNumber: '3', 
        image: require('../../img/pages/monster/page3.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice6.png'),
            },
            {
                image: require('../../img/pages/monster/choice7.png'),
            }
        ]
        },
        {
        pageId: 'a06eb728-03c6-4810-8d5d-55b28e37e67e', 
        pageNumber: '4', 
        image: require('../../img/pages/monster/page4.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice8.png'),
            },
            {
                image: require('../../img/pages/monster/choice9.png'),
            }
        ]
        },
        {
        pageId: '7e55b594-e38b-4ac5-bb16-91e60376fbe0', 
        pageNumber: '5', 
        image: require('../../img/pages/monster/page5.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice10.png'),
            },
            {
                image: require('../../img/pages/monster/choice11.png'),
            }
        ]
        },
        {
        pageId: 'ceeeec56-3455-4d41-89ba-2ca5930b6fec', 
        pageNumber: '6', 
        image: require('../../img/pages/monster/page6.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice12.png'),
            },
            {
                image: require('../../img/pages/monster/choice13.png'),
            }
        ]
        },
        {
        pageId: 'b0758b8d-51e2-4d36-a328-215ce1271d9a', 
        pageNumber: '7', 
        image: require('../../img/pages/monster/page7.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice14.png'),
            },
            {
                image: require('../../img/pages/monster/choice15.png'),
            }
        ]
        },
        {
        pageId: '59b292a4-b3ef-45ca-86b9-ad77e022c500', 
        pageNumber: '8', 
        image: require('../../img/pages/monster/page8.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice16.png'),
            },
            {
                image: require('../../img/pages/monster/choice17.png'),
            }
        ]
        },
        {
        pageId: 'b5e108e0-baee-49ed-aca6-2d5bf707ebfc', 
        pageNumber: '9', 
        image: require('../../img/pages/monster/page9.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice18.png'),
            },
            {
                image: require('../../img/pages/monster/choice19.png'),
            }
        ]
        },
        {
        pageId: '3ed66707-225a-4e1f-be4d-c3aa5cf1ec96', 
        pageNumber: '10', 
        image: require('../../img/pages/monster/page10.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice20.png'),
            },
            {
                image: require('../../img/pages/monster/choice21.png'),
            }
        ]
        },
        {
        pageId: '3023dad3-b9eb-4475-a1e4-2c0a81e76709', 
        pageNumber: '11', 
        image: require('../../img/pages/monster/page11.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice22.png'),
            },
            {
                image: require('../../img/pages/monster/choice23.png'),
            }
        ]
        },
        {
        pageId: 'aa8dcae6-265b-4999-a4b2-c595ddb01155', 
        pageNumber: '12', 
        image: require('../../img/pages/monster/page12.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice24.png'),
            },
            {
                image: require('../../img/pages/monster/choice25.png'),
            }
        ]
        },
        {
        pageId: 'b2569004-eb36-48ff-b393-c910a0a6e8f9', 
        pageNumber: '13', 
        image: require('../../img/pages/monster/page13.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice26.png'),
            },
            {
                image: require('../../img/pages/monster/choice27.png'),
            }
        ]
        },
        {
        pageId: 'e7c17ef5-d792-423f-9fb4-a22f671ffffb', 
        pageNumber: '14', 
        image: require('../../img/pages/monster/page14.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice28.png'),
            },
            {
                image: require('../../img/pages/monster/choice29.png'),
            }
        ]
        },
        {
        pageId: '185df49d-fd58-4167-bc84-64586f06ddcb', 
        pageNumber: '15', 
        image: require('../../img/pages/monster/page15.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice30.png'),
            },
            {
                image: require('../../img/pages/monster/choice31.png'),
            }
        ]
        },
        {
        pageId: 'cab50beb-063b-4ccf-8648-179345f6769c', 
        pageNumber: '16', 
        image: require('../../img/pages/monster/page16.jpg')
        },
        {
        pageId: 'bb43f739-6936-4ac9-ab74-ff492fc0473e', 
        pageNumber: '17', 
        image: require('../../img/pages/monster/page17.jpg')
        },
        {
        pageId: '93abeebb-e4a2-4266-845f-debc2e09f4d0', 
        pageNumber: '18', 
        image: require('../../img/pages/monster/page18.jpg')
        },
        {
        pageId: '5048456f-4cdf-42d6-bd1c-a7aead85ec10', 
        pageNumber: '19', 
        image: require('../../img/pages/monster/page19.jpg')
        },
        {
        pageId: '78beb6a0-796f-41af-9239-71d6ecffcf54', 
        pageNumber: '20', 
        image: require('../../img/pages/monster/page20.jpg')
        },
        {
        pageId: '6203007a-5fe6-4e5b-84d9-f7a64062ee77', 
        pageNumber: '21', 
        image: require('../../img/pages/monster/page21.jpg')
        },
        {
        pageId: '3f0fec4a-34e5-41cf-ae93-b7eaf177beb5', 
        pageNumber: '22', 
        image: require('../../img/pages/monster/page22.jpg')
        },
        {
        pageId: '163f38d8-7149-4e4f-b896-85a405b1ca0f', 
        pageNumber: '23', 
        image: require('../../img/pages/monster/page23.jpg')
        },
        {
        pageId: '85521619-d50e-4e01-9e29-60295839751e', 
        pageNumber: '24', 
        image: require('../../img/pages/monster/page24.jpg')
        },
        {
        pageId: 'a9ef6aea-3eae-471d-9eb4-854ba2fc4af3', 
        pageNumber: '25', 
        image: require('../../img/pages/monster/page25.jpg')
        },
        {
        pageId: 'bde692a3-13ab-4718-ae8a-9ceed77e34c5', 
        pageNumber: '26', 
        image: require('../../img/pages/monster/page26.jpg')
        },
        {
        pageId: '1d5444e3-be7b-4f46-b0e4-d2509f8b7dbd', 
        pageNumber: '27', 
        image: require('../../img/pages/monster/page27.jpg')
        },
        {
        pageId: 'd7dbe138-f2b6-4b18-b918-afd60040c54b', 
        pageNumber: '28', 
        image: require('../../img/pages/monster/page28.jpg')
        },
        {
        pageId: '941432ec-54ca-4685-8315-6459a2642144', 
        pageNumber: '29', 
        image: require('../../img/pages/monster/page29.jpg')
        },
        {
        pageId: '88034f26-fd28-4ba7-8da4-8b864839ac01', 
        pageNumber: '30', 
        image: require('../../img/pages/monster/page30.jpg')
        },
        {
        pageId: 'df8c6c19-33d9-4014-a5a8-873054150d0b', 
        pageNumber: '31', 
        image: require('../../img/pages/monster/page31.jpg')
        },
        
        // Sea creature
        {
        pageId: 'AEDC706C-A30B-35A9-475D-5415AFA48631', 
        pageNumber: '1', 
        image: require('../../img/pages/seacreature/page1.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice2.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice3.png'),
            }
        ]
        },
        {
        pageId: '25CEDC33-7FA5-E999-4E06-8FA50CF3DFEE', 
        pageNumber: '2', 
        image: require('../../img/pages/seacreature/page2.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice4.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice5.png'),
            }
        ]
        },
        {
        pageId: '78A1BF40-A600-7AA7-4675-56D049C40746', 
        pageNumber: '3', 
        image: require('../../img/pages/seacreature/page3.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice6.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice7.png'),
            }
        ]
        },
        {
        pageId: 'DC394A1F-EF6B-AE8C-49AC-0AB78ECF3099', 
        pageNumber: '4', 
        image: require('../../img/pages/seacreature/page4.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice8.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice9.png'),
            }
        ]
        },
        {
        pageId: '254A0E98-E213-5CA4-42F1-69826EFFB79E', 
        pageNumber: '5', 
        image: require('../../img/pages/seacreature/page5.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice10.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice11.png'),
            }
        ]
        },
        {
        pageId: 'D71E5075-A84F-51B1-4765-4BDFB7FDB026', 
        pageNumber: '6', 
        image: require('../../img/pages/seacreature/page6.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice12.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice13.png'),
            }
        ]
        },
        {
        pageId: '1096E9EC-75F4-47B0-4678-DFE27CE844F6', 
        pageNumber: '7', 
        image: require('../../img/pages/seacreature/page7.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice14.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice15.png'),
            }
        ]
        },
        {
        pageId: '599D8236-5858-0EBB-4B00-6E830EF098B7', 
        pageNumber: '8', 
        image: require('../../img/pages/seacreature/page8.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice16.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice17.png'),
            }
        ]
        },
        {
        pageId: 'D224077B-663F-5387-4DAC-5EE93C079489', 
        pageNumber: '9', 
        image: require('../../img/pages/seacreature/page9.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice18.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice19.png'),
            }
        ]
        },
        {
        pageId: '929339B8-4A12-A99E-4D15-DBAD37AC097D', 
        pageNumber: '10', 
        image: require('../../img/pages/seacreature/page10.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice20.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice21.png'),
            }
        ]
        },
        {
        pageId: 'B8EBA124-8568-0F9A-4533-F096117E1B93', 
        pageNumber: '11', 
        image: require('../../img/pages/seacreature/page11.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice22.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice23.png'),
            }
        ]
        },
        {
        pageId: '9271C5A1-AD83-999D-423B-60A1EC416CDA', 
        pageNumber: '12', 
        image: require('../../img/pages/seacreature/page12.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice26.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice27.png'),
            }
        ]
        },
        {
        pageId: '1B15D4D3-C766-C29E-4384-EE15B3277CA7', 
        pageNumber: '13', 
        image: require('../../img/pages/seacreature/page13.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice24.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice25.png'),
            }
        ]
        },
        {
        pageId: 'C5211099-F4DC-D8BD-4780-051FDF0C8A73', 
        pageNumber: '14', 
        image: require('../../img/pages/seacreature/page14.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice28.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice29.png'),
            }
        ]
        },
        {
        pageId: 'FAAB7864-8EB9-88A9-4EA0-BC4946A9695F', 
        pageNumber: '15', 
        image: require('../../img/pages/seacreature/page15.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice30.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice31.png'),
            }
        ]
        },
        {
        pageId: '1CB9601D-A243-63BD-4A2B-45A2EB95508F', 
        pageNumber: '16', 
        image: require('../../img/pages/seacreature/page16.jpg')
        },
        {
        pageId: 'CDAEC680-9967-30B7-4EC8-15CB29F5C376', 
        pageNumber: '17', 
        image: require('../../img/pages/seacreature/page17.jpg')
        },
        {
        pageId: '5FE6F036-6B1C-3CAB-4AF9-11872E2C6457', 
        pageNumber: '18', 
        image: require('../../img/pages/seacreature/page18.jpg')
        },
        {
        pageId: '235D7A41-10EA-3C9E-4D25-785823C017DD', 
        pageNumber: '19', 
        image: require('../../img/pages/seacreature/page19.jpg')
        },
        {
        pageId: '3B5E812B-AB22-BEB0-40D3-E4B5542ACCC8', 
        pageNumber: '20', 
        image: require('../../img/pages/seacreature/page20.jpg')
        },
        {
        pageId: '6BEAEAE6-E03F-C98C-4869-5C44790C0B48', 
        pageNumber: '21', 
        image: require('../../img/pages/seacreature/page21.jpg')
        },
        {
        pageId: '2B76F98E-9B05-DD85-4D4D-21CE13FA4913', 
        pageNumber: '22', 
        image: require('../../img/pages/seacreature/page22.jpg')
        },
        {
        pageId: '3849EFA5-639E-CCB8-467D-186B468E9079', 
        pageNumber: '23', 
        image: require('../../img/pages/seacreature/page23.jpg')
        },
        {
        pageId: '418B0D28-AB28-9B9A-4200-0132AACE4EB2', 
        pageNumber: '24', 
        image: require('../../img/pages/seacreature/page24.jpg')
        },
        {
        pageId: '81B649FF-352D-BEA7-4ADA-CDD311A4BB9F', 
        pageNumber: '25', 
        image: require('../../img/pages/seacreature/page25.jpg')
        },
        {
        pageId: '8D4A540E-E50E-6296-4954-3C4C54F2C454', 
        pageNumber: '26', 
        image: require('../../img/pages/seacreature/page26.jpg')
        },
        {
        pageId: '1C5FCFA0-4332-F7B9-4835-5A64A2CFAB48', 
        pageNumber: '27', 
        image: require('../../img/pages/seacreature/page27.jpg')
        },
        {
        pageId: '5C44A0E9-0A3C-B38E-431D-D8E829CF81C6', 
        pageNumber: '28', 
        image: require('../../img/pages/seacreature/page28.jpg')
        },
        {
        pageId: 'A65E14EF-0E3E-3CAD-4A3E-FB9949F798F1', 
        pageNumber: '29', 
        image: require('../../img/pages/seacreature/page29.jpg')
        },
        {
        pageId: '0BBBEFC9-28A5-FDBC-4FD8-D83CC33E9793', 
        pageNumber: '30', 
        image: require('../../img/pages/seacreature/page30.jpg')
        },
        {
        pageId: '8DEDF121-7FFA-2E9A-4B5D-493DF861B7B2', 
        pageNumber: '31', 
        image: require('../../img/pages/seacreature/page31.jpg')
        },   
        
        // Alien
        {
            pageId: '6668D4F6-26BF-12A3-407C-9CBEE69C6B94', 
            pageNumber: '1', 
            image: require('../../img/pages/alien/page1.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice2.png'),
                },
                {
                    image: require('../../img/pages/alien/choice3.png'),
                }
            ]
            },
            {
            pageId: '9793EA7F-766D-46B9-430A-6AD586624CF3', 
            pageNumber: '2', 
            image: require('../../img/pages/alien/page2.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice4.png'),
                },
                {
                    image: require('../../img/pages/alien/choice5.png'),
                }
            ]
            },
            {
            pageId: '4E03D489-1B33-20A0-4B4D-78C36817FBFE', 
            pageNumber: '3', 
            image: require('../../img/pages/alien/page3.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice6.png'),
                },
                {
                    image: require('../../img/pages/alien/choice7.png'),
                }
            ]
            },
            {
            pageId: 'DFD85366-26EE-AFA2-4BF6-D6D5059C711F', 
            pageNumber: '4', 
            image: require('../../img/pages/alien/page4.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice8.png'),
                },
                {
                    image: require('../../img/pages/alien/choice9.png'),
                }
            ]
            },
            {
            pageId: '5A62DAAC-8ACC-10BE-471F-04A78347D0BC', 
            pageNumber: '5', 
            image: require('../../img/pages/alien/page5.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice10.png'),
                },
                {
                    image: require('../../img/pages/alien/choice11.png'),
                }
            ]
            },
            {
            pageId: 'BBFF5212-9A29-D790-4C6E-C7E58AA20DE2', 
            pageNumber: '6', 
            image: require('../../img/pages/alien/page6.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice12.png'),
                },
                {
                    image: require('../../img/pages/alien/choice13.png'),
                }
            ]
            },
            {
            pageId: '54DE8313-BB2F-F487-4781-407DE0B60909', 
            pageNumber: '7', 
            image: require('../../img/pages/alien/page7.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice14.png'),
                },
                {
                    image: require('../../img/pages/alien/choice15.png'),
                }
            ]
            },
            {
            pageId: '4D724AD8-B192-19B2-442B-1F6ED5249BBF', 
            pageNumber: '8', 
            image: require('../../img/pages/alien/page8.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice16.png'),
                },
                {
                    image: require('../../img/pages/alien/choice17.png'),
                }
            ]
            },
            {
            pageId: '26FBD9BE-4D52-62A5-4075-7A8A1C6E2B31', 
            pageNumber: '9', 
            image: require('../../img/pages/alien/page9.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice18.png'),
                },
                {
                    image: require('../../img/pages/alien/choice19.png'),
                }
            ]
            },
            {
            pageId: '731F2059-98E6-71BB-4E08-F85D563F3A0F', 
            pageNumber: '10', 
            image: require('../../img/pages/alien/page10.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice20.png'),
                },
                {
                    image: require('../../img/pages/alien/choice21.png'),
                }
            ]
            },
            {
            pageId: 'B0072B48-0DEE-6C91-4550-B2AEA50533AF', 
            pageNumber: '11', 
            image: require('../../img/pages/alien/page11.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice22.png'),
                },
                {
                    image: require('../../img/pages/alien/choice23.png'),
                }
            ]
            },
            {
            pageId: 'CA2A2185-7924-4C9E-4A57-FCBE84CE9EEA', 
            pageNumber: '12', 
            image: require('../../img/pages/alien/page12.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice24.png'),
                },
                {
                    image: require('../../img/pages/alien/choice25.png'),
                }
            ]
            },
            {
            pageId: 'EC45B537-8D25-8BB6-4B80-413A593D4FBB', 
            pageNumber: '13', 
            image: require('../../img/pages/alien/page13.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice26.png'),
                },
                {
                    image: require('../../img/pages/alien/choice27.png'),
                }
            ]
            },
            {
            pageId: 'D33FB159-A2B0-FAAC-4540-B1ECA99038B0', 
            pageNumber: '14', 
            image: require('../../img/pages/alien/page14.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice28.png'),
                },
                {
                    image: require('../../img/pages/alien/choice29.png'),
                }
            ]
            },
            {
            pageId: 'EB32FA60-1AA7-EBB2-4040-0C1F49CD7C5C', 
            pageNumber: '15', 
            image: require('../../img/pages/alien/page15.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/alien/choice30.png'),
                },
                {
                    image: require('../../img/pages/alien/choice31.png'),
                }
            ]
            },
            {
            pageId: '38AD2B90-8122-0FBC-4341-643C527A2B4E', 
            pageNumber: '16', 
            image: require('../../img/pages/alien/page16.png')
            },
            {
            pageId: '63A33859-1D9D-62A7-46EB-EF4E50490D45', 
            pageNumber: '17', 
            image: require('../../img/pages/alien/page17.png')
            },
            {
            pageId: '59D0874A-18FA-778A-4257-3A69200F809D', 
            pageNumber: '18', 
            image: require('../../img/pages/alien/page18.png')
            },
            {
            pageId: '43BC9332-C103-0892-489A-BE01698FEF28', 
            pageNumber: '19', 
            image: require('../../img/pages/alien/page19.png')
            },
            {
            pageId: 'CF7ED794-79BC-E098-454D-4B42E5A68479', 
            pageNumber: '20', 
            image: require('../../img/pages/alien/page20.png')
            },
            {
            pageId: '74C9C830-00CE-A88D-43DD-4AA53D631B48', 
            pageNumber: '21', 
            image: require('../../img/pages/alien/page21.png')
            },
            {
            pageId: 'A34DB6A1-1CC2-29AD-476F-BCBAC75DCEB4', 
            pageNumber: '22', 
            image: require('../../img/pages/alien/page22.png')
            },
            {
            pageId: '98E2B30F-A51F-54B1-4836-11D74824FEC1', 
            pageNumber: '23', 
            image: require('../../img/pages/alien/page23.png')
            },
            {
            pageId: '75160F4C-FCC4-43B0-4CE5-C67AB0353BA3', 
            pageNumber: '24', 
            image: require('../../img/pages/alien/page24.png')
            },
            {
            pageId: '0AFDB757-00B3-A98A-45CE-C1FE6EA36614', 
            pageNumber: '25', 
            image: require('../../img/pages/alien/page25.png')
            },
            {
            pageId: 'B69F91DF-E1EA-AF87-4EAB-EE02A5F31F83', 
            pageNumber: '26', 
            image: require('../../img/pages/alien/page26.png')
            },
            {
            pageId: 'F0AC7403-A3A6-77A4-4150-29201AAB3D71', 
            pageNumber: '27', 
            image: require('../../img/pages/alien/page27.png')
            },
            {
            pageId: '1E5CB178-D949-38B4-4FC0-8E6EBD6D5FFF', 
            pageNumber: '28', 
            image: require('../../img/pages/alien/page28.png')
            },
            {
            pageId: '8469A2CA-AFD8-B6A7-4EA3-85E8FFEF3037', 
            pageNumber: '29', 
            image: require('../../img/pages/alien/page29.png')
            },
            {
            pageId: '0AE2EDCF-930A-3093-455B-6492915140A2', 
            pageNumber: '30', 
            image: require('../../img/pages/alien/page30.png')
            },
            {
            pageId: '7DAFE264-DEC5-9493-4BF4-34887B02609D', 
            pageNumber: '31', 
            image: require('../../img/pages/alien/page31.png')
            },  
            // fairytale
        {
            pageId: '6A3AFEDE-9F67-86B6-4C53-4C7141871BB6', 
            pageNumber: '1', 
            image: require('../../img/pages/fairytale/page1.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice2.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice3.png'),
                }
            ]
            },
            {
            pageId: '7CCB2C58-4CA9-16AD-4862-6D1EA00C256C', 
            pageNumber: '2', 
            image: require('../../img/pages/fairytale/page2.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice4.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice5.png'),
                }
            ]
            },
            {
            pageId: '60FD729D-AC5C-5388-44DE-D186AFD16F71', 
            pageNumber: '3', 
            image: require('../../img/pages/fairytale/page3.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice6.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice7.png'),
                }
            ]
            },
            {
            pageId: '4B558219-AA5C-E6BD-4E36-58D55F494366', 
            pageNumber: '4', 
            image: require('../../img/pages/fairytale/page4.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice8.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice9.png'),
                }
            ]
            },
            {
            pageId: 'CB001CEB-E611-A9A7-46C4-9B911AE2C660', 
            pageNumber: '5', 
            image: require('../../img/pages/fairytale/page5.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice10.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice11.png'),
                }
            ]
            },
            {
            pageId: 'A550B610-5805-8EA6-4F8B-0CDF7CAF62EF', 
            pageNumber: '6', 
            image: require('../../img/pages/fairytale/page6.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice12.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice13.png'),
                }
            ]
            },
            {
            pageId: 'E6E39D2E-B541-6B93-4300-9A85CC13704F', 
            pageNumber: '7', 
            image: require('../../img/pages/fairytale/page7.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice14.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice15.png'),
                }
            ]
            },
            {
            pageId: '5FA258B7-36F6-AB9A-46C8-697B2B38082D', 
            pageNumber: '8', 
            image: require('../../img/pages/fairytale/page8.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice16.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice17.png'),
                }
            ]
            },
            {
            pageId: 'A24AC61C-D46E-549F-4D0E-0BF40B9FC958', 
            pageNumber: '9', 
            image: require('../../img/pages/fairytale/page9.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice18.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice19.png'),
                }
            ]
            },
            {
            pageId: '1045B517-A82B-B2B0-4E53-B04526DE5EC8', 
            pageNumber: '10', 
            image: require('../../img/pages/fairytale/page10.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice20.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice21.png'),
                }
            ]
            },
            {
            pageId: '70195C50-E285-68B7-49CB-2A07EF4F7885', 
            pageNumber: '11', 
            image: require('../../img/pages/fairytale/page11.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice22.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice23.png'),
                }
            ]
            },
            {
            pageId: '9DCEC7DA-AE41-02B1-495E-56F7563A6A18', 
            pageNumber: '12', 
            image: require('../../img/pages/fairytale/page12.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice24.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice25.png'),
                }
            ]
            },
            {
            pageId: '1948E15E-0965-CF8E-433A-82CF34F464E3', 
            pageNumber: '13', 
            image: require('../../img/pages/fairytale/page13.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice26.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice27.png'),
                }
            ]
            },
            {
            pageId: '193746FE-4688-8096-4A56-3548757BD8AB', 
            pageNumber: '14', 
            image: require('../../img/pages/fairytale/page14.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice28.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice29.png'),
                }
            ]
            },
            {
            pageId: '8DA7064A-E54C-96AF-4978-C7FFAD72B948', 
            pageNumber: '15', 
            image: require('../../img/pages/fairytale/page15.png'),
            choiceImages: [
                {
                    image: require('../../img/pages/fairytale/choice30.png'),
                },
                {
                    image: require('../../img/pages/fairytale/choice31.png'),
                }
            ]
            },
            {
            pageId: 'D74B3303-1E12-0299-4843-C82D67997179', 
            pageNumber: '16', 
            image: require('../../img/pages/fairytale/page16.png')
            },
            {
            pageId: '3C9DD4D3-BEA5-8882-4513-459099EACCD2', 
            pageNumber: '17', 
            image: require('../../img/pages/fairytale/page17.png')
            },
            {
            pageId: 'CE3FC45F-03A8-D3AF-421A-9DD9855ED72F', 
            pageNumber: '18', 
            image: require('../../img/pages/fairytale/page18.png')
            },
            {
            pageId: 'EEC2580F-7CEC-E086-4E33-08466686BBAF', 
            pageNumber: '19', 
            image: require('../../img/pages/fairytale/page19.png')
            },
            {
            pageId: '6EC23AD0-B6BF-D49E-4A07-992322FD256C', 
            pageNumber: '20', 
            image: require('../../img/pages/fairytale/page20.png')
            },
            {
            pageId: 'C1125F9A-1483-21B7-4487-665F90C78CBB', 
            pageNumber: '21', 
            image: require('../../img/pages/fairytale/page21.png')
            },
            {
            pageId: '17059A7E-45A6-A6B7-446A-F51615850026', 
            pageNumber: '22', 
            image: require('../../img/pages/fairytale/page22.png')
            },
            {
            pageId: 'F8BEF9B5-85B2-6BB2-49BA-77322DA257F7', 
            pageNumber: '23', 
            image: require('../../img/pages/fairytale/page23.png')
            },
            {
            pageId: '8C5FF07E-8903-2D93-417D-56B6E04EECEA', 
            pageNumber: '24', 
            image: require('../../img/pages/fairytale/page24.png')
            },
            {
            pageId: '488D1C44-6DF5-75B1-44B8-AFFB78A9EE34', 
            pageNumber: '25', 
            image: require('../../img/pages/fairytale/page25.png')
            },
            {
            pageId: 'E3FC6095-A610-F1B9-4034-5D13EAE264F2', 
            pageNumber: '26', 
            image: require('../../img/pages/fairytale/page26.png')
            },
            {
            pageId: 'BB7D86CB-18AC-19BE-489D-851D370F2FF2', 
            pageNumber: '27', 
            image: require('../../img/pages/fairytale/page27.png')
            },
            {
            pageId: 'F5514FB2-AA8A-9BA7-446A-193E4A80120F', 
            pageNumber: '28', 
            image: require('../../img/pages/fairytale/page28.png')
            },
            {
            pageId: 'D373D2A1-CB85-7CA0-49EB-176C55713325', 
            pageNumber: '29', 
            image: require('../../img/pages/fairytale/page29.png')
            },
            {
            pageId: '84AB1497-9D03-E1A8-4A51-F382E5588344', 
            pageNumber: '30', 
            image: require('../../img/pages/fairytale/page30.png')
            },
            {
            pageId: '9089C68F-62DB-8991-4BE4-CD50FBF4C028', 
            pageNumber: '31', 
            image: require('../../img/pages/fairytale/page31.png')
            },    
            // DINOSAUR 
            {
                pageId: 'B23FF616-1E26-DAB0-44D5-2DDD1647FC33', 
                pageNumber: '1', 
                image: require('../../img/pages/dinosaur/page1.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice2.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice3.png'),
                    }
                ]
                },
                {
                pageId: '1E4C10AF-25D7-B593-4F3E-BEE6C8F33860', 
                pageNumber: '2', 
                image: require('../../img/pages/dinosaur/page2.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice4.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice5.png'),
                    }
                ]
                },
                {
                pageId: '586AE500-8AC4-D381-47FA-1B1AFAB34091', 
                pageNumber: '3', 
                image: require('../../img/pages/dinosaur/page3.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice6.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice7.png'),
                    }
                ]
                },
                {
                pageId: '4B3234D3-8460-37A9-43D2-CEA10137EBDF', 
                pageNumber: '4', 
                image: require('../../img/pages/dinosaur/page4.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice8.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice9.png'),
                    }
                ]
                },
                {
                pageId: 'B2E408BC-3F40-8B92-417D-BA248FF2A251', 
                pageNumber: '5', 
                image: require('../../img/pages/dinosaur/page5.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice10.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice11.png'),
                    }
                ]
                },
                {
                pageId: 'B23286B4-1714-7795-4C8A-05BC26294211', 
                pageNumber: '6', 
                image: require('../../img/pages/dinosaur/page6.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice12.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice13.png'),
                    }
                ]
                },
                {
                pageId: '430143E0-449E-28AA-4A86-AC9891CAC66D', 
                pageNumber: '7', 
                image: require('../../img/pages/dinosaur/page7.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice14.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice15.png'),
                    }
                ]
                },
                {
                pageId: '74CFD18D-55C8-95B1-403E-B9F55E83A482', 
                pageNumber: '8', 
                image: require('../../img/pages/dinosaur/page8.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice16.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice17.png'),
                    }
                ]
                },
                {
                pageId: '9D210C8D-F847-8AAA-4D1C-F7178F58EEE0', 
                pageNumber: '9', 
                image: require('../../img/pages/dinosaur/page9.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice18.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice19.png'),
                    }
                ]
                },
                {
                pageId: '0E214BD1-F4EF-469A-47B9-644FEE747E4F', 
                pageNumber: '10', 
                image: require('../../img/pages/dinosaur/page10.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice20.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice21.png'),
                    }
                ]
                },
                {
                pageId: 'D1BA3D93-7714-809E-4A87-3090DBABE5D1', 
                pageNumber: '11', 
                image: require('../../img/pages/dinosaur/page11.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice22.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice23.png'),
                    }
                ]
                },
                {
                pageId: 'EBFFB7CF-6099-DE95-4508-EA516264A987', 
                pageNumber: '12', 
                image: require('../../img/pages/dinosaur/page12.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice24.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice25.png'),
                    }
                ]
                },
                {
                pageId: '43582364-6238-D39B-4F07-2925BBC6B16D', 
                pageNumber: '13', 
                image: require('../../img/pages/dinosaur/page13.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice26.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice27.png'),
                    }
                ]
                },
                {
                pageId: 'B19743BB-A556-C58B-4F34-4ACEE2949E3E', 
                pageNumber: '14', 
                image: require('../../img/pages/dinosaur/page14.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice28.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice29.png'),
                    }
                ]
                },
                {
                pageId: 'F5BD013A-D53D-5BB0-47D3-F3B18860CD4A', 
                pageNumber: '15', 
                image: require('../../img/pages/dinosaur/page15.png'),
                choiceImages: [
                    {
                        image: require('../../img/pages/dinosaur/choice30.png'),
                    },
                    {
                        image: require('../../img/pages/dinosaur/choice31.png'),
                    }
                ]
                },
                {
                pageId: '67FD4C54-6478-2EA4-405C-0509F73ACA82', 
                pageNumber: '16', 
                image: require('../../img/pages/dinosaur/page16.png')
                },
                {
                pageId: '0A4B4307-4AEA-9391-4EEE-293D38186CEF', 
                pageNumber: '17', 
                image: require('../../img/pages/dinosaur/page17.png')
                },
                {
                pageId: '96A661BA-F15A-1A8E-456F-A352EB66F4DF', 
                pageNumber: '18', 
                image: require('../../img/pages/dinosaur/page18.png')
                },
                {
                pageId: '98C75B11-C441-358F-4D34-CB12EEBBAC04', 
                pageNumber: '19', 
                image: require('../../img/pages/dinosaur/page19.png')
                },
                {
                pageId: '998B62BB-19A4-CFA4-4BDC-06D8297FE90A', 
                pageNumber: '20', 
                image: require('../../img/pages/dinosaur/page20.png')
                },
                {
                pageId: '4CD18EBF-0A20-E78E-402C-89C447F59F62', 
                pageNumber: '21', 
                image: require('../../img/pages/dinosaur/page21.png')
                },
                {
                pageId: '7D93D7B3-36C7-939A-4B89-8B2886B62629', 
                pageNumber: '22', 
                image: require('../../img/pages/dinosaur/page22.png')
                },
                {
                pageId: '23E95EB7-B6FF-4F84-4778-D5B611F74860', 
                pageNumber: '23', 
                image: require('../../img/pages/dinosaur/page23.png')
                },
                {
                pageId: 'B3D15B46-585C-CCAD-43DA-2B43FABA53C9', 
                pageNumber: '24', 
                image: require('../../img/pages/dinosaur/page24.png')
                },
                {
                pageId: '936147D0-BFDF-BFB8-459F-12179E29EB5E', 
                pageNumber: '25', 
                image: require('../../img/pages/dinosaur/page25.png')
                },
                {
                pageId: '9EF1ECD6-41E7-AC9B-45E3-0D40CC854F9F', 
                pageNumber: '26', 
                image: require('../../img/pages/dinosaur/page26.png')
                },
                {
                pageId: 'B9F12FA3-6D97-5F92-4CA8-0F954B09E0D3', 
                pageNumber: '27', 
                image: require('../../img/pages/dinosaur/page27.png')
                },
                {
                pageId: 'F49A142D-9807-3F98-482F-6A2797E59BD5', 
                pageNumber: '28', 
                image: require('../../img/pages/dinosaur/page28.png')
                },
                {
                pageId: 'DC779BEC-3DD2-C6B1-4FC8-0C860FF2249E', 
                pageNumber: '29', 
                image: require('../../img/pages/dinosaur/page29.png')
                },
                {
                pageId: '70C7788F-603B-9CB2-4C29-3E284EF05507', 
                pageNumber: '30', 
                image: require('../../img/pages/dinosaur/page30.png')
                },
                {
                pageId: '25CC70EE-C75E-F7A1-4D72-1E41176D0B22', 
                pageNumber: '31', 
                image: require('../../img/pages/dinosaur/page31.png')
                },                    
]

export function getImageForPage(pageId)
{
    return _resourcesByPage.filter(p => p.pageId === pageId)[0].image;
}

export function getChoiceImageForPage(pageId, index)
{
    var choiceImages = _resourcesByPage.filter(p => p.pageId === pageId)[0].choiceImages;
    if (!choiceImages) return require('../../img/pages/monster/choice2.png');
    var choiceImage = choiceImages[index];
    return choiceImage ? choiceImage.image : null;
}

export function getEndAudioForBook(bookId)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0];
    return book.endAudio;
}

export function getStartImageForBook(bookId)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0];
    return book.startImage;
}

export function getStartAudioForBook(bookId)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0];
    return book.startAudio;
}

export function getStartSoundEffectForBook(bookId)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0];
    return book.startSoundEffect;
}

export function getCoverForBook(bookId)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0]
    return book.coverImage;
}

export function getEndForBook(bookId)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0]
    return book.endImage;
}

export function getHalfCoverForBook(bookId, leftHalf)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0]
    return leftHalf ? book.coverImageLeftHalf : book.coverImageRightHalf;
}