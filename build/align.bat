delete choosicles.apk
delete choosicles_aligned.apk
copy C:\Dev\Apps\Choosicles\android\app\build\outputs\apk\app-release.apk choosicles.apk
zipalign -f -v 4 choosicles.apk choosicles_aligned.apk