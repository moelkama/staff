from django.http import JsonResponse, FileResponse
import os

MEDIA_ROOT = '/usr/src/app/media/'

def serve_file(request, dir, file):
    path = f"{MEDIA_ROOT}{dir}/{file}"
    if os.path.exists(path):
        return FileResponse(open(path, 'rb'))
    return JsonResponse({"error": "File not found"}, status=404)


def download_file(request):
    file_path = os.path.join('/uploads/', 'file.pdf')
    file_handle = open(file_path, 'rb')
    
    # Return the file as a response
    return FileResponse(file_handle, as_attachment=True, filename='file.pdf')