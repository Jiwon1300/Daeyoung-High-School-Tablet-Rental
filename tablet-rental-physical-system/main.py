import socketio
import time

biometric_event_name = "startBiometricVerify"
tablet_rental_start_event = "rentalStart"
tablet_case_id = "0"

# Socket.IO 클라이언트 생성
sio = socketio.Client()

def tablet_lock(lock):
    if lock == True:
        print("잠김")
        # 릴레이 닫기 
        ## 잠기는 코드
    else:
        print("열림")

        #태블릿을 가져갔다면 릴레이 열기

def is_in_tablet(tablet_id):
    # 적외선 센서 사용
    # 태블릿 번호를 통해서 일치한 곳에 태블릿이 있는지
    return False #여부


# 연결 이벤트 처리기
@sio.event
def connect():
    print('서버에 연결되었습니다.')

# 지문인식 이벤트
@sio.on(biometric_event_name)
def verify_start(data):
    request_tablet_case_id = data["tabletCase"]
    student_id = data["studentId"] ## 학생 아이디
    if(tablet_case_id == request_tablet_case_id):
        print("인증시작")
        # 인증로직
        print("인증완료")
        tablet_lock(False)
        sio.emit('doneVerify',data)

# 태블릿 대여 시작 이벤트
@sio.on(tablet_rental_start_event)
def rental_start(data):
    request_tablet_case_id = data["tabletCaseId"]
    student_id = data["studentId"]
    tablet_id = data["tabletId"]
    if tablet_case_id == request_tablet_case_id:
        print("태블릿 케이스 열림")
        tablet_lock(False)
        time.sleep(30)
        tablet_lock(True)
        if is_in_tablet(tablet_id) == False:
            sio.emit('tabletRentalCancel',data)
        
        # 태블릿을 가져가지 않았따면 반납처리
        # 조건문을 통해서 태블릿 아이디와 일치하는 칸에 LED를 키고 도어 릴레이 열기

# 태블릿 반납 이벤트
@sio.on("tabletReturn")
def tablet_return(data):
    request_tablet_case_id = data["tabletCaseId"]
    tablet_id = data["tabletId"]
    if(tablet_case_id == request_tablet_case_id):
        tablet_lock(False)
        time.sleep(30)
        tablet_lock(True)
        if is_in_tablet(tablet_id) == True:
            sio.emit('returnSuccess',data)

        


# 연결 끊김 이벤트 처리기
@sio.event
def disconnect():
    print('서버와의 연결이 끊어졌습니다.')

if __name__ == '__main__':
    # 서버에 연결
    sio.connect('http://localhost:3001')


    # 서버로부터의 응답을 대기
    sio.wait()
    


