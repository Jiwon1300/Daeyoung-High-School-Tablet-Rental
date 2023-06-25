import socketio

tablet_case_name = "tabletCase-0"
tablet_lock_name = "tabletLock-0"

# Socket.IO 클라이언트 생성
sio = socketio.Client()

# 연결 이벤트 처리기
@sio.event
def connect():
    print('서버에 연결되었습니다.')

# 메시지 이벤트 처리기
@sio.on(tablet_case_name)
def verify_start(data):
    tablet_case_id = data["tabletCase"]
    student_id = data["studentId"]
    print("인증시작")
    # 인증로직
    print("인증완료")
    sio.emit('doneVerify',data)

@sio.on(tablet_lock_name)
def tablet_lock(data):
    lock = data["isLock"]
    if(lock):
        #잠금
        ...
    else:
        ...

# 연결 끊김 이벤트 처리기
@sio.event
def disconnect():
    print('서버와의 연결이 끊어졌습니다.')

if __name__ == '__main__':
    # 서버에 연결
    sio.connect('http://localhost:3001')


    # 서버로부터의 응답을 대기
    sio.wait()


