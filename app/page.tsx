export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0d12",
        color: "#ffffff",
        fontFamily: "Arial, 'Noto Sans KR', sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ padding: "40px 20px" }}>

        {/* 자물쇠 */}
        <div
          style={{
            position: "relative",
            width: "110px",
            height: "125px",
            margin: "0 auto 35px",
          }}
        >
          {/* 자물쇠 고리 */}
          <div
            style={{
              position: "absolute",
              left: "24px",
              top: 0,
              width: "62px",
              height: "62px",
              border: "9px solid white",
              borderBottom: "none",
              borderRadius: "35px 35px 0 0",
            }}
          />

          {/* 자물쇠 몸통 */}
          <div
            style={{
              position: "absolute",
              left: "5px",
              bottom: 0,
              width: "100px",
              height: "82px",
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 15px 45px rgba(0,0,0,0.4)",
            }}
          >
            {/* 열쇠구멍 */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "23px",
                transform: "translateX(-50%)",
                width: "17px",
                height: "17px",
                background: "#0b0d12",
                borderRadius: "50%",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "36px",
                transform: "translateX(-50%)",
                width: "7px",
                height: "25px",
                background: "#0b0d12",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        {/* 제목 */}
        <h1
          style={{
            margin: 0,
            fontSize: "27px",
            fontWeight: 700,
            letterSpacing: "-1px",
          }}
        >
          현재 사이트를 폐쇄했습니다.
        </h1>

        {/* 설명 */}
        <p
          style={{
            marginTop: "16px",
            color: "#a9adb8",
            fontSize: "15px",
            lineHeight: 1.8,
          }}
        >
          이용하지 않아 사이트를 닫아두었습니다.
          <br />
          
          <br />
          
        </p>

        {/* 상태 */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "28px",
            padding: "9px 16px",
            border: "1px solid #292d36",
            borderRadius: "999px",
            background: "#12151b",
            color: "#8f95a3",
            fontSize: "13px",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#666b76",
            }}
          />
          현재 이용할 수 없습니다
        </div>

        <div
          style={{
            marginTop: "32px",
            color: "#5f6470",
            fontSize: "12px",
          }}
        >
          감사합니다.
        </div>

      </div>
    </main>
  );
}