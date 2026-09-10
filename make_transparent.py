import sys
from PIL import Image

def remove_white(img_path):
    try:
        img = Image.open(img_path).convert("RGBA")
        datas = img.getdata()
        new_data = []
        for item in datas:
            # Check if pixel is light enough to be considered background
            if item[0] > 245 and item[1] > 245 and item[2] > 245:
                # White pixel -> transparent
                new_data.append((255, 255, 255, 0))
            else:
                # Keep original pixel
                new_data.append(item)
        img.putdata(new_data)
        img.save(img_path, "PNG")
        print(f"Processed {img_path}")
    except Exception as e:
        print(f"Failed {img_path}: {e}")

images = ["public/conversational_icon.png", "public/general_icon.png", "public/exams_icon.png"]
for img in images:
    remove_white(img)
