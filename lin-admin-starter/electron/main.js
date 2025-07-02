// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow, ipcMain, screen, Menu, dialog, clipboard } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import net from 'net'
import { exec } from 'child_process'

// 是否为开发环境
const isDev = process.env.NODE_ENV === 'development'

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const { VITE_DEV_SERVER_URL } = process.env
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win = null
const machineId = null
const port = 3333
// 检测端口是否被占用
function isPortUsed(port) {
  return new Promise((resolve, reject) => {
    const server = net
      .createServer()
      .once('error', err => {
        if (err.code === 'EADDRINUSE') {
          resolve(true) // 端口被占用
        } else {
          reject(err) // 其他错误
        }
      })
      .once('listening', () => {
        server
          .once('close', () => {
            resolve(false) // 端口未被占用
          })
          .close()
      })
      .listen(port)
  })
}

// 关闭占用端口的进程
function killPortProcess(port) {
  return new Promise((resolve, reject) => {
    // 使用 lsof 命令查找占用端口的进程
    const command = process.platform === 'win32' ? `netstat -ano | findstr :${port}` : `lsof -i :${port} | grep LISTEN`

    exec(command, (err, stdout) => {
      if (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`无法查找端口 ${port} 的进程: ${err.message}`)
        return
      }

      // 解析进程 ID
      const lines = stdout.trim().split('\n')
      if (lines.length === 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`未找到占用端口 ${port} 的进程`)
        return
      }

      // 获取进程 ID
      const processLine = lines[0]
      const processId = process.platform === 'win32'
        ? processLine.trim().split(/\s+/).pop() // Windows: 取最后一列
        : processLine.trim().split(/\s+/)[1] // macOS/Linux: 取第二列

      if (!processId) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('无法解析进程 ID')
        return
      }

      // 杀死进程
      const killCommand = process.platform === 'win32' ? `taskkill /PID ${processId} /F` : `kill -9 ${processId}`

      exec(killCommand, err => {
        if (err) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(`无法杀死进程 ${processId}: ${err.message}`)
          return
        }
        resolve(`成功杀死进程 ${processId}`)
      })
    })
  })
}

let safeConfig = []
const createServer = () => {
  const app = express()
  // 解析 application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  // 解析 application/json
  app.use(bodyParser.json())
  // 获取机器码
  app.get('/machine-id', (_req, res) => {
    res.send(machineId)
  })
  // 获取配置
  app.get('/safe-config', (_req, res) => {
    res.send(safeConfig)
  })
  // 请求AI服务
  app.post('/boolean-ai', async (req, res) => {
    const { body } = req
    const { aiplatform, aivalue, authorization } = body
    let resp = {}
    try {
      const response = await axios({
        method: 'post',
        url: `https://boolsurvey.com/ai-api/${aiplatform}/${aivalue}/chat`,
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
        data: body,
        timeout: 30000,
        validateStatus(status) {
          return status >= 200 && status < 500
        },
      })
      resp = response.data
    } catch (error) {
      let errMsg = error.message
      if (error.code === 'ECONNABORTED') {
        errMsg = '请求超时'
      }
      resp = { code: -1, msg: errMsg }
    }
    res.send(resp)
  })

  app.listen(port, () => {
    console.log(`boolean server 已启用 at http://localhost:${port}`)
  })
}

// 主逻辑
async function ensurePortAvailable(port) {
  try {
    const used = await isPortUsed(port)
    if (used) {
      // logger.debug(`端口 ${port} 被占用，尝试关闭占用进程...`)
      await killPortProcess(port)
      // logger.debug(`端口 ${port} 已释放`)
    } else {
      // logger.info(`端口 ${port} 未被占用`)
    }
    createServer()
  } catch (err) {
    console.error(`处理端口 ${port} 时出错:`, err)
  }
}
// 使用示例
ensurePortAvailable(port)

// 创建菜单
function createMenu() {
  const template = [
    {
      label: '工具',
      submenu: [
        {
          label: '获取机器码',
          click: () => {
            if (machineId) {
              // 弹出对话框显示机器码
              dialog
                .showMessageBox({
                  type: 'info',
                  title: '机器码',
                  message: `您的机器码是：${machineId}`,
                  buttons: ['复制', '确定'],
                })
                .then(({ response }) => {
                  if (response === 0) {
                    // 用户点击了“复制”按钮
                    clipboard.writeText(machineId)
                    dialog.showMessageBox({
                      type: 'info',
                      title: '复制成功',
                      message: '机器码已复制到剪贴板',
                      buttons: ['确定'],
                    })
                  }
                })
            } else {
              dialog.showErrorBox('错误', '无法获取机器码')
            }
          },
        },
        {
          label: 'devtools',
          submenu: [
            {
              label: '控制台',
              click: () => {
                win?.webContents.openDevTools()
              },
            },
            {
              label: '刷新',
              click: () => {
                win?.webContents.reload()
              },
            },
          ],
        },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: width - 200,
    height: height - 100,
    webPreferences: {
      // 开启硬件加速
      webgl: true,
      experimentalFeatures: true,
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  win.webContents.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,Bool, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  )

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  createMenu()
  // 仅在生产环境检查更新
  if (!isDev) {
    // 设置自动更新
    // setupAutoUpdater(win)
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  clearInterval(autoDelBrowerTimer)
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 处理 invoke 调用
// ipcMain.handle('create-brower', async (_event, args) => new Promise((resolve, reject) => {}))

let autoDelBrowerTimer = null
ipcMain.handle('auto-del-brower', async () => {
  clearInterval(autoDelBrowerTimer)
})

// 风控开关
ipcMain.handle('secure-brower', async (_event, _args) => {
  console.log('secure-brower: ', _args)
})

ipcMain.handle('auto-kernel-brower', async () => {})

ipcMain.handle('change-brower', async () => {})

ipcMain.handle('change-browerConfig', async (_event, _args) => {
  console.log('_args: ', _args)
  if (_args && _args.plugins && _args.plugins.length) {
    safeConfig = _args.pluginsRules
  } else {
    safeConfig = []
  }
})

ipcMain.handle('flow-brower', async (_event, _args) => {
  console.log('flow-brower: ', _args)
})

app.whenReady().then(createWindow)
