@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\..\..\.0.5.0@jsesc\bin\jsesc" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\..\..\.0.5.0@jsesc\bin\jsesc" %*
)