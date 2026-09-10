# CREDENCE Role Rules

## Student
- Student can learn and consume published content.
- Student cannot create, edit, publish, or delete academy content.
- Student workspace: Notes, Tests, Quizzes, Videos, Live, People.
- Student menu stays minimal: Settings only.
- Student settings: app colour/theme, learning notification preference, new-tab file preference, profile/role information, app version, logout.
- Selected student colour applies across the student workspace theme.
- Paid content must use the existing CREDENCE payment/fee flow.

## Teacher
- Teacher can manage their own teaching/classes under the existing class-role rules.
- Teacher can publish/manage teaching content allowed by the existing managers: Notes, Tests/MCQs, Quizzes, Videos, Live classes.
- Teacher does not receive Admin-only people/account controls.
- Teacher workspace is separate from Student and Admin.

## Admin
- Admin has full academy-management access already provided by the existing Admin system.
- Admin can manage students, teachers, classes, fees, communication, and publishing.
- Admin publishing covers Notes, Tests/MCQs, Quizzes, Videos, Live classes.
- Admin workspace is separate from Student and Teacher.

## Content
- Notes support the existing text/image/PDF manager.
- Tests support written questions and MCQs through the existing manager.
- Quizzes, Videos and Live use the existing Content Studio/publishing path.
- Subject names should remain data-driven so new subjects appear automatically when content is published.
- Expired content should not remain visible to students.
- Live classes use the existing YouTube Live publishing approach; completed live sessions can become replayable video content.

## Storage and safety
- The standalone Storage app is separate and must not be modified by Student/Admin/Teacher UI work.
- Existing Admin/Teacher manager code remains the source of truth for its established functionality.
- Role isolation must be preserved so Student code does not load Admin/Teacher modules unnecessarily.
