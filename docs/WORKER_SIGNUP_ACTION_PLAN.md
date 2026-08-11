# Worker Signup Server Action Plan

## 1. 문서 목적

이 문서는 `/worker/signup` 화면을 Supabase Auth 및 `public.users`, `public.workers`, `public.referrals` 테이블과 연결하기 전에 저장 순서, 오류 처리, 보안 기준, 1차 구현 범위를 정리하기 위한 문서입니다.

이번 단계는 구현 전 설계 점검이며, 실제 회원가입 기능, Supabase Auth 호출, DB insert 코드, Server Action 파일, form action 연결은 만들지 않습니다.

## 2. 현재 상태

- `/worker/signup` UI가 존재합니다.
- `/worker/login` UI가 존재합니다.
- Supabase browser/server client 설정이 완료되어 있습니다.
- Vercel 환경변수 등록이 완료되어 있습니다.
- Supabase migration 실행과 주요 테이블 생성이 완료되어 있습니다.
- `users`, `workers`, `referrals` 테이블이 존재합니다.
- `referrals` 테이블에는 `referral_name`, `referral_phone`, `review_status`가 있습니다.
- 아직 실제 Auth 호출은 없습니다.
- 아직 실제 DB 저장은 없습니다.
- 현재 회원가입/로그인 화면은 UI preview이며 `use client`, React state, form submit 처리 없이 구성되어 있습니다.

## 3. 1차 구현 목표

1차 회원가입 구현의 목표는 근로자가 이메일/비밀번호 기반 Supabase Auth 계정을 만들고, 같은 흐름에서 플랫폼 기본 사용자 정보와 근로자 프로필을 저장하는 것입니다.

포함 범위:

- `/worker/signup` 화면을 실제 제출 가능한 구조로 전환합니다.
- Supabase Auth `signUp`을 연결합니다.
- `public.users` 테이블에 근로자 기본 정보를 저장합니다.
- `public.workers` 테이블에 근로자 선호 조건을 저장합니다.
- 소개자 정보가 입력된 경우에만 `public.referrals` 테이블에 저장합니다.
- 성공 후 `/worker/jobs`로 이동합니다.
- 실패 시 사용자 친화적인 오류 메시지를 안내합니다.

제외 범위:

- 로그인 기능 구현
- 이메일 인증 고도화
- 전화번호 인증
- 카카오/네이버 로그인
- 관리자 소개자 실제 DB 목록 연결
- 소개 수당 자동 계산
- 소개 수당 지급 처리
- 계좌번호 입력
- middleware 기반 보호 라우트
- API route
- DB 타입 자동 생성
- 테스트 계정 자동 생성

## 4. 추천 파일 구조

다음 구현 단계에서의 추천 파일 후보는 아래와 같습니다.

- `src/app/worker/signup/actions.ts`
  - `'use server'`를 선언합니다.
  - `signupWorkerAction`을 정의합니다.
  - FormData 검증, Supabase Auth `signUp`, `users/workers/referrals` 저장, 결과 반환 또는 redirect 흐름을 담당합니다.
- `src/app/worker/signup/page.tsx`
  - 서버 컴포넌트로 유지합니다.
  - 현재 UI를 HTML form 기반으로 바꾸고 `action={signupWorkerAction}` 구조로 연결합니다.
  - 입력 필드의 `name` 값을 실제 저장 컬럼과 매핑 가능한 이름으로 정리합니다.
- `src/app/worker/signup/SignupSubmitButton.tsx`
  - 필요할 때만 만듭니다.
  - 제출 중 상태 표시가 꼭 필요하면 최소 `use client` 컴포넌트로 분리합니다.

1차 구현에서는 가능하면 `use client` 없이 Server Action과 HTML form action만 사용하는 방향을 우선 검토합니다. onClick 기반 제출은 사용하지 않습니다.

## 5. 회원가입 입력값

현재 `/worker/signup` UI 기준의 실제 제출 입력값은 아래처럼 정리합니다.

- `name`: `public.users.name`
- `phone`: `public.users.phone`
- `email`: Supabase Auth email 및 `public.users.email`
- `password`: Supabase Auth password
- `preferred_regions`: `public.workers.preferred_regions`
- `preferred_job_categories`: `public.workers.preferred_job_categories`
- `preferred_payment_options`: `public.workers.preferred_payment_options`
- `referral_name`: `public.referrals.referral_name`
- `referral_phone`: `public.referrals.referral_phone`

migration SQL 기준 실제 컬럼명은 `preferred_region`, `preferred_trade`, `preferred_pay_type`이 아니라 `preferred_regions`, `preferred_job_categories`, `preferred_payment_options`입니다. 세 값은 `text[]` 컬럼이므로 1차 구현에서는 쉼표 또는 선택 UI 값을 배열로 정규화한 뒤 저장하는 방향을 권장합니다.

## 6. 데이터 저장 순서

권장 저장 순서는 다음과 같습니다.

1. `FormData`에서 입력값을 추출합니다.
2. 필수값을 검증합니다.
3. Supabase Auth `signUp`을 호출합니다.
4. Auth user id를 확보합니다.
5. `public.users`에 기본 사용자 정보를 insert합니다.
6. `public.workers`에 근로자 프로필을 insert합니다.
7. `referral_name` 또는 `referral_phone` 중 하나라도 입력된 경우 `public.referrals`에 소개자 정보를 insert합니다.
8. 성공 후 `/worker/jobs`로 redirect합니다.
9. 실패 시 사용자 친화적인 오류 메시지를 반환합니다.

migration SQL 기준 관계는 다음과 같습니다.

- `public.users.id`는 `auth.users(id)`를 참조합니다.
- `public.workers.user_id`는 `public.users(id)`를 참조합니다.
- `public.referrals.worker_id`는 `public.workers(id)`를 참조합니다.

따라서 `referrals` 저장은 `workers` insert 결과에서 생성된 `workers.id`를 확보한 뒤에만 가능합니다.

## 7. referrals 저장 조건

- `referral_name` 또는 `referral_phone` 중 하나라도 입력되면 `public.referrals`에 저장합니다.
- 둘 다 비어 있으면 `public.referrals`에는 저장하지 않습니다.
- `review_status`는 migration SQL의 기본값인 `pending_review`를 사용합니다.
- 소개 수당은 시스템 자동 지급 기능이 아니라 관리자 수동 검토 대상입니다.
- 지급 여부와 지급 처리 상태는 관리자 운영 기준에 따라 추후 확인합니다.

소개 수당 기능은 1차 구현에서 자동 지급 기능이 아닙니다. 가입자의 소개자 정보를 기록하고 관리자가 나중에 확인할 수 있게 하는 운영 보조 기능으로 구현합니다.

## 8. 오류 처리 기준

검토할 오류 상황:

- 이메일 중복
- 비밀번호 형식 오류
- 필수값 누락
- Auth `signUp` 실패
- `users` insert 실패
- `workers` insert 실패
- `referrals` insert 실패
- 네트워크 오류
- RLS 정책으로 인한 insert 실패

오류 처리 원칙:

- 사용자에게 개발자 오류 메시지를 그대로 보여주지 않습니다.
- 기본 오류 문구는 “가입 처리 중 문제가 발생했습니다. 입력 정보를 확인하고 다시 시도해주세요.”처럼 안내합니다.
- 이메일 형식, 비밀번호 길이, 필수값 누락처럼 사용자가 바로 고칠 수 있는 항목은 구체적으로 안내합니다.
- 콘솔에 민감정보를 출력하지 않습니다.
- service_role key로 우회하지 않습니다.

## 9. 부분 실패 처리 기준

Auth `signUp`은 성공했지만 `users`, `workers`, `referrals` 저장이 실패하는 경우가 있을 수 있습니다.

선택지 A:

- 실패 시 사용자에게 오류를 안내합니다.
- 관리자 또는 개발자가 Supabase에서 미완성 사용자를 확인합니다.
- 단순하지만 운영 중 찌꺼기 데이터가 남을 수 있습니다.

선택지 B:

- 실패 시 가능한 범위에서 생성된 프로필 데이터를 정리합니다.
- Auth user 삭제는 service_role 권한이 필요할 수 있으므로 1차 구현에서는 복잡합니다.

권장:

1차 구현에서는 service_role key를 쓰지 않고, Auth 생성 후 DB 저장 실패 가능성을 최소화하기 위해 입력 검증과 RLS 정책을 먼저 확인합니다. Auth user 삭제 자동화는 1차에서 제외합니다. DB 저장 실패가 반복되면 RLS 정책 또는 저장 순서를 별도 단계에서 조정합니다.

## 10. RLS 확인 사항

현재 migration SQL 기준 확인할 사항은 다음과 같습니다.

- `authenticated` 사용자가 `public.users`에 `id = auth.uid()` 조건으로 자기 정보를 insert할 수 있습니다.
- `authenticated` 사용자가 `public.workers`에 `user_id = auth.uid()` 조건으로 자기 worker profile을 insert할 수 있습니다.
- `authenticated` 사용자가 자기 `workers.id` 기준으로 `public.referrals`에 referral record를 insert할 수 있습니다.
- admin은 `referrals` 전체 조회 및 수정이 가능합니다.

현재 정책상 insert 자체는 가능해 보입니다. 다만 실제 구현 전에는 Server Action에서 `signUp` 직후 세션이 즉시 존재하는지, `auth.uid()`가 insert 정책에서 기대대로 평가되는지를 직접 확인해야 합니다. 만약 publishable key 기반 server client에서 신규 가입 직후 insert가 RLS로 실패하면, 이번 단계에서 정책을 수정하지 않고 “RLS 재확인 필요”로 분리합니다.

## 11. 성공 후 이동 경로

후보:

- `/worker/jobs`
- `/worker/my`

1차 구현에서는 `/worker/jobs`로 이동하는 것을 권장합니다.

이유:

- 가입 직후 근로자의 자연스러운 첫 행동은 일자리 확인입니다.
- 현재 `/worker/jobs`는 이미 존재하고 화면 흐름이 안정적입니다.
- `/worker/my`는 이후 프로필 수정 기능이 붙으면 중요도가 커집니다.

## 12. 사용자 안내 문구

회원가입 화면 안내 문구 후보:

- 입력한 정보는 근로자 일자리 확인 및 지원 준비를 위해 사용합니다.
- 소개자가 있다면 입력해주세요. 소개자 정보는 회원가입 경로 확인 및 소개 수당 지급 검토 목적으로만 사용합니다.
- 실제 소개 수당 지급은 BuildOn Work 운영자가 별도 기준에 따라 확인합니다.

오류 문구 후보:

- 필수 정보를 입력해주세요.
- 이메일 형식을 확인해주세요.
- 비밀번호는 최소 6자 이상 입력해주세요.
- 가입 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
- 이미 가입된 이메일일 수 있습니다. 로그인 화면에서 다시 확인해주세요.

## 13. 보안 기준

- service_role key는 사용하지 않습니다.
- Secret key는 사용하지 않습니다.
- DB password는 사용하지 않습니다.
- connection string은 사용하지 않습니다.
- `.env.local`은 커밋하지 않습니다.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`만 사용합니다.
- 민감정보를 `console.log`로 출력하지 않습니다.
- 사용자에게 DB 오류 원문을 그대로 보여주지 않습니다.
- 계좌번호, 주민등록번호, 신분증 정보는 1차 구현에서 받지 않습니다.
- 소개자 전화번호는 관리자 운영 목적 외부로 노출하지 않습니다.

## 14. 1차 구현에서 만들지 않을 것

- 로그인 기능 연결
- 로그아웃 기능
- 이메일 인증 고도화
- 비밀번호 재설정
- 전화번호 인증
- 휴대폰 본인인증
- 카카오 로그인
- 네이버 로그인
- 관리자 실제 referral 목록 연결
- 소개 수당 지급 처리
- 계좌번호 입력
- 근로계약서 자동 작성
- 안전교육 이수증
- 알림 발송
- middleware 기반 접근 제어
- API route
- DB 타입 자동 생성
- 테스트 계정 자동 생성

## 15. 실제 구현 전 체크리스트

- [ ] migration SQL 기준 실제 컬럼명을 확인했다.
- [ ] `users/workers/referrals` 관계를 확인했다.
- [ ] `signUp` 후 auth user id를 `public.users.id`에 넣을지 확인했다.
- [ ] `workers.user_id`에 auth user id를 넣는 흐름을 확인했다.
- [ ] `referrals.worker_id`에는 `workers.id`를 넣는 흐름을 확인했다.
- [ ] 소개자 정보가 있을 때만 `referrals`에 저장한다.
- [ ] service_role key 없이 구현 가능한지 확인했다.
- [ ] RLS 정책상 insert가 가능한지 확인했다.
- [ ] 실패 시 사용자 안내 문구를 준비했다.
- [ ] 회원가입 성공 후 `/worker/jobs`로 이동한다.
- [ ] 1차 구현에서 로그인 기능은 제외한다.
