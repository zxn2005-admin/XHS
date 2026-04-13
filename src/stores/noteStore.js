import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const mockNotes = [
  {
    id: 1,
    title: '周末探店｜这家咖啡店真的太好拍了！',
    content: '今天和闺蜜一起来了这家藏在巷子里的咖啡店，环境真的超级棒！复古的装修风格，随手一拍都是大片。咖啡的味道也很赞，推荐他们家的拿铁，奶泡超级细腻～ 人均50左右，性价比很高！',
    cover: 'https://picsum.photos/400/500?random=1',
    images: ['https://picsum.photos/800/600?random=1', 'https://picsum.photos/800/600?random=2'],
    user: {
      id: 1,
      nickname: '小清新',
      avatar: 'https://picsum.photos/100/100?random=101'
    },
    likes: 1234,
    comments: 89,
    collects: 456,
    tags: ['咖啡探店', '周末好去处', '拍照打卡'],
    createTime: '2024-01-15'
  },
  {
    id: 2,
    title: '日常穿搭｜春季温柔系穿搭分享',
    content: '春天来了，又到了穿小裙子的季节～ 今天给大家分享一套超级温柔的春季穿搭。米白色的针织开衫搭配碎花连衣裙，再配上一双小白鞋，整体感觉超级清新！',
    cover: 'https://picsum.photos/400/600?random=2',
    images: ['https://picsum.photos/800/600?random=3'],
    user: {
      id: 2,
      nickname: '时尚达人',
      avatar: 'https://picsum.photos/100/100?random=102'
    },
    likes: 2345,
    comments: 156,
    collects: 789,
    tags: ['春季穿搭', '温柔风', '每日穿搭'],
    createTime: '2024-01-14'
  },
  {
    id: 3,
    title: '美食教程｜超简单的芝士焗饭',
    content: '在家也能做出西餐厅级别的芝士焗饭！材料超级简单：剩饭、芝士、玉米、火腿、鸡蛋。做法：先把材料炒香，铺上满满的芝士，烤箱200度15分钟就搞定啦！',
    cover: 'https://picsum.photos/400/400?random=3',
    images: ['https://picsum.photos/800/600?random=4', 'https://picsum.photos/800/600?random=5'],
    user: {
      id: 3,
      nickname: '美食家',
      avatar: 'https://picsum.photos/100/100?random=103'
    },
    likes: 3456,
    comments: 234,
    collects: 1234,
    tags: ['美食教程', '家常菜', '芝士控'],
    createTime: '2024-01-13'
  },
  {
    id: 4,
    title: '旅行日记｜大理真的太美了！',
    content: '终于来到了心心念念的大理！洱海真的太治愈了，骑着小电驴环海真的超级舒服。双廊古镇也很有特色，推荐大家一定要住海景房，早上推开窗就是日出，美哭了！',
    cover: 'https://picsum.photos/400/550?random=4',
    images: ['https://picsum.photos/800/600?random=6'],
    user: {
      id: 4,
      nickname: '旅行家',
      avatar: 'https://picsum.photos/100/100?random=104'
    },
    likes: 4567,
    comments: 345,
    collects: 2345,
    tags: ['大理旅行', '云南攻略', '洱海'],
    createTime: '2024-01-12'
  },
  {
    id: 5,
    title: '护肤分享｜干皮救星来了',
    content: '作为一个资深干皮，今天给大家分享我的冬季护肤routine。洁面后先上精华水，然后是精华、眼霜、乳液，最后一定要涂面霜锁水！每周2-3次面膜，皮肤真的会变好～',
    cover: 'https://picsum.photos/400/480?random=5',
    images: ['https://picsum.photos/800/600?random=7'],
    user: {
      id: 5,
      nickname: '护肤达人',
      avatar: 'https://picsum.photos/100/100?random=105'
    },
    likes: 5678,
    comments: 456,
    collects: 3456,
    tags: ['护肤分享', '干皮护肤', '冬季护肤'],
    createTime: '2024-01-11'
  },
  {
    id: 6,
    title: '居家好物｜提升幸福感的小物件',
    content: '分享几个提升居家幸福感的小物件～ 香薰蜡烛真的是必备，晚上点上超级有氛围。还有床头的小夜灯，颜值超高又实用！',
    cover: 'https://picsum.photos/400/520?random=6',
    images: ['https://picsum.photos/800/600?random=8', 'https://picsum.photos/800/600?random=9'],
    user: {
      id: 6,
      nickname: '生活家',
      avatar: 'https://picsum.photos/100/100?random=106'
    },
    likes: 2134,
    comments: 123,
    collects: 1567,
    tags: ['居家好物', '提升幸福感', '生活好物'],
    createTime: '2024-01-10'
  },
  {
    id: 7,
    title: '健身打卡｜坚持3个月的变化',
    content: '坚持健身3个月啦！从最开始跑5分钟就喘，到现在可以轻松跑5公里。体重虽然只降了5斤，但是体型变化真的很大！姐妹们，运动真的是最好的护肤品～',
    cover: 'https://picsum.photos/400/580?random=7',
    images: ['https://picsum.photos/800/600?random=10'],
    user: {
      id: 7,
      nickname: '健身女孩',
      avatar: 'https://picsum.photos/100/100?random=107'
    },
    likes: 6789,
    comments: 567,
    collects: 4567,
    tags: ['健身打卡', '运动日记', '减肥'],
    createTime: '2024-01-09'
  },
  {
    id: 8,
    title: '书单推荐｜女生必看的5本书',
    content: '今天推荐5本女生必看的书，看完真的会成长很多！《被讨厌的勇气》教会我们接纳自己，《小王子》让我们保持童真，还有...',
    cover: 'https://picsum.photos/400/500?random=8',
    images: ['https://picsum.photos/800/600?random=11'],
    user: {
      id: 8,
      nickname: '读书人',
      avatar: 'https://picsum.photos/100/100?random=108'
    },
    likes: 3456,
    comments: 234,
    collects: 5678,
    tags: ['书单推荐', '女生必看', '阅读'],
    createTime: '2024-01-08'
  }
]

export const useNoteStore = defineStore('note', () => {
  const notes = ref([...mockNotes])
  const myNotes = ref([])
  const myCollections = ref([])
  const myLikes = ref([])

  const getNoteById = (id) => {
    return notes.value.find(note => note.id === parseInt(id))
  }

  const searchNotes = (keyword) => {
    if (!keyword) return notes.value
    return notes.value.filter(note => 
      note.title.includes(keyword) || 
      note.tags.some(tag => tag.includes(keyword))
    )
  }

  const addNote = (note) => {
    const newNote = {
      id: Date.now(),
      ...note,
      likes: 0,
      comments: 0,
      collects: 0,
      createTime: new Date().toISOString().split('T')[0]
    }
    notes.value.unshift(newNote)
    myNotes.value.push(newNote)
  }

  const toggleLike = (noteId) => {
    const note = notes.value.find(n => n.id === noteId)
    if (note) {
      const index = myLikes.value.findIndex(n => n.id === noteId)
      if (index > -1) {
        note.likes--
        myLikes.value.splice(index, 1)
      } else {
        note.likes++
        myLikes.value.push(note)
      }
    }
  }

  const toggleCollect = (noteId) => {
    const note = notes.value.find(n => n.id === noteId)
    if (note) {
      const index = myCollections.value.findIndex(n => n.id === noteId)
      if (index > -1) {
        note.collects--
        myCollections.value.splice(index, 1)
      } else {
        note.collects++
        myCollections.value.push(note)
      }
    }
  }

  const isLiked = (noteId) => {
    return myLikes.value.some(n => n.id === noteId)
  }

  const isCollected = (noteId) => {
    return myCollections.value.some(n => n.id === noteId)
  }

  return {
    notes,
    myNotes,
    myCollections,
    myLikes,
    getNoteById,
    searchNotes,
    addNote,
    toggleLike,
    toggleCollect,
    isLiked,
    isCollected
  }
})
