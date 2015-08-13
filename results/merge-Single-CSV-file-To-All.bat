@echo off
setlocal
set first=1
set fileName="ResultOfAllParticipants.csv"
>%fileName% (
  for %%F in (*.csv) do (
    if not "%%F"==%fileName% (
      if defined first (
        type "%%F"
        set "first="
      ) else more +1 "%%F"
    )
  )
)