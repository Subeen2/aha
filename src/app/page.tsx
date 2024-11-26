"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/lib/features/userAuth/userAuthSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/lib/store";
import * as THREE from "three";

export default function Home() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const user = useSelector((state: RootState) => state.userAuth);
  const dispatch = useDispatch();
  const router = useRouter();
  const userUID = user.user?.user_uid;

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 실행되도록 처리

    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer 생성
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      (window.innerWidth * 0.7) / window.innerHeight,
      0.1,
      1000
    );

    // 창 크기가 변경될 때 캔버스 크기도 업데이트
    window.addEventListener("resize", () => {
      // 브라우저 창의 크기에 맞게 canvas 크기 조정
      const width = window.innerWidth * 0.7;
      const height = window.innerHeight;

      // 렌더러 크기 설정
      renderer.setSize(width, height);

      // 카메라 종횡비 업데이트
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.7, window.innerHeight);
    renderer.setClearColor(0xffffff); // 배경색을 흰색으로 설정
    mount.appendChild(renderer.domElement); // mountRef에 렌더러 추가

    // 조명 추가
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    // 하트 모양 생성
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, -0.5, -0.5, -0.5, -0.5, 0);
    heartShape.bezierCurveTo(-0.5, 0.5, 0, 0.5, 0, 1);
    heartShape.bezierCurveTo(0, 0.5, 0.5, 0.5, 0.5, 0);
    heartShape.bezierCurveTo(0.5, -0.5, 0, -0.5, 0, 0);

    const geometry = new THREE.ShapeGeometry(heartShape);
    const material = new THREE.MeshBasicMaterial({ color: 0xff69b4 }); // 핑크색
    const heart = new THREE.Mesh(geometry, material);

    scene.add(heart);

    // // 비눗방울 생성 함수
    // function createBubble() {
    //   const geometry = new THREE.SphereGeometry(1, 32, 32);
    //   const material = new THREE.MeshPhongMaterial({
    //     color: 0x87cefa, // 예쁜 파란색 (Sky Blue)
    //     transparent: true,
    //     opacity: 0.6,
    //     shininess: 100,
    //   });

    //   const bubble = new THREE.Mesh(geometry, material);
    //   bubble.position.set(
    //     (Math.random() - 0.5) * 10,
    //     (Math.random() - 0.5) * 10,
    //     (Math.random() - 0.5) * 10
    //   );
    //   bubble.scale.set(0.1, 0.1, 0.1);

    //   scene.add(bubble);
    //   return bubble;
    // }

    // // 비눗방울 20개 생성
    // const bubbles: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial>[] =
    //   [];
    // for (let i = 0; i < 20; i++) {
    //   bubbles.push(createBubble());
    // }

    // 카메라 위치
    // camera.position.z = 15;
    camera.position.z = 5;

    // 애니메이션
    function animate() {
      requestAnimationFrame(animate);

      // 각 비눗방울을 조금씩 크게 하고, 위치를 약간 이동
      // bubbles.forEach((bubble) => {
      //   bubble.scale.x += 0.01;
      //   bubble.scale.y += 0.01;
      //   bubble.scale.z += 0.01;

      //   bubble.position.y += 0.02; // 위로 살짝 이동
      // });

      // 하트를 가로축으로 360도 회전
      heart.rotation.x += 0.01;
      heart.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();

    // Clean up on unmount
    return () => {
      if (mount) {
        mount.removeChild(renderer.domElement); // mount에서 renderer 제거
      }
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {isClient && user.isAuthenticated === true ? (
          <div className="animate-wiggle max-w-sm mx-auto p-6 flex items-center bg-white rounded-xl shadow-md space-x-4">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href={`/interests/${userUID}`}
            >
              나의 관심사 등록하기
            </a>
          </div>
        ) : null}
        {isClient && user.isAuthenticated === true ? (
          <div
            ref={mountRef}
            rel="noopener noreferrer"
            className="w-16 h-16 bg-main300 rounded-full animate-bubble"
          ></div>
        ) : null}
      </div>
    </main>
  );
}
