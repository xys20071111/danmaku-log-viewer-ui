<template>
  <el-container>
    <el-header>
      弹幕日志查看器
      <el-divider />
    </el-header>
    <el-main>
      <el-tabs>
        <el-tab-pane label="按用户">
          <el-form-item label="UID">
            <el-input v-model="uid"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="nickname"></el-input>
          </el-form-item>
          <el-tabs>
            <el-tab-pane label="按日期">
              <el-form-item label="日期字符串">
                <el-input v-model="date"></el-input>
              </el-form-item>
              <el-button @click="queryUserByDate">查询</el-button>
            </el-tab-pane>
            <el-tab-pane label="按数量">
              <el-form-item label="数量">
                <el-input v-model="count"></el-input>
              </el-form-item>
              <el-button @click="queryUserByCount">查询</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="按房间">
          <el-form-item label="房间号">
            <el-input v-model="roomid"></el-input>
          </el-form-item>
          <el-tabs>
            <el-tab-pane label="按日期">
              <el-form-item label="日期字符串">
                <el-input v-model="date"></el-input>
              </el-form-item>
              <el-button @click="queryRoomByDate">查询</el-button>
            </el-tab-pane>
            <el-tab-pane label="按数量">
              <el-form-item label="数量">
                <el-input v-model="count"></el-input>
              </el-form-item>
              <el-button @click="queryRoomByCount">查询</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
      <el-table :data="resultArray">
        <el-table-column prop="id" lebel="id" />
        <el-table-column prop="time" lebel="时间" />
        <el-table-column prop="uid" lebel="UID" />
        <el-table-column prop="nickname" lebel="昵称" />
        <el-table-column prop="text" lebel="弹幕内容" />
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { IMsg, IData } from './IMsg'

const uid = ref(0)
const count = ref(0)
const date = ref('')
const roomid = ref(0)
const nickname = ref('')

const resultArray: Ref<Array<IData>> = ref([])

async function queryUserByDate() {
  if (nickname.value.length === 0) {
    const result: IMsg = await (await (await fetch(`/api/query/uid?uid=${uid.value}&date=${date.value}`)).json())
    resultArray.value = result.data
  } else {
    const result: IMsg = await (await (await fetch(`/api/query/nickname?nickname=${nickname.value}&date=${date.value}`)).json())
    resultArray.value = result.data
  }
}

async function queryUserByCount() {
  if (nickname.value.length === 0) {
    const result: IMsg = await (await (await fetch(`/api/query/uid?uid=${uid.value}&count=${count.value}`)).json())
    resultArray.value = result.data
  } else {
    const result: IMsg = await (await (await fetch(`/api/query/nickname?nickname=${nickname.value}&count=${count.value}`)).json())
    resultArray.value = result.data
  }
}
async function queryRoomByDate() {
  const result: IMsg = await (await (await fetch(`/api/query/room?room=${roomid.value}&date=${date.value}`)).json())
  resultArray.value = result.data
}

async function queryRoomByCount() {
  const result: IMsg = await (await (await fetch(`/api/query/room?room=${roomid.value}&count=${count.value}`)).json())
  resultArray.value = result.data
}
</script>

