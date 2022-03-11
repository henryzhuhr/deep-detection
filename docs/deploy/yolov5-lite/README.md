## YOLOv5-Lite使用说明

### 什么是[YOLOv5-Lite](https://github.com/ppogg/YOLOv5-Lite)？

 YOLOv5-Lite是在YOLOv5的基础上进行一系列消融实验得到的更轻(Flops更小，内存更低，参数更少)，速度更快(增加shuffle channel, yolov5 head for channel reduce)的目标检测模型。当使用320×320输入帧时，在Raspberry Pi 4B上可以推断出至少10+ FPS)，并且更容易部署(删除Focus层和4个切片操作，将模型量化精度降低到一个可接受的范围)。

### 快速使用
**1.安装YOLOv5-Lite**

```
$ git clone https://github.com/ppogg/YOLOv5-Lite
$ cd YOLOv5-Lite
$ pip install -r requirements.txt
```

**2.验证安装环境**

在[latest YOLOv5-Lite release](https://github.com/ppogg/YOLOv5-Lite/releases) 中下载对应权重文件，运行以下指令调用demo文件,文件将自动保存在 `runs/detect`中

```
$ python detect.py --source 0  # webcam
                            file.jpg  # image 
                            file.mp4  # video
                            path/  # directory
                            path/*.jpg  # glob
                            'https://youtu.be/NUsoVlDFqZg'  # YouTube
                            'rtsp://example.com/media.mp4'  # RTSP, RTMP, HTTP stream
```

### 数据集训练 

**1.标注：**使用[labelImg](https://github.com/tzutalin/labelImg) 对数据集进行标注

**2.数据集结构转换：**数据集结构与YOLOv5一致，结构如下所示：

```
└── dataset-custom  # 数据集文件夹
    ├── src         # 原始数据，按照类别进行归档
    ├── labeled     # 压缩、重命名后的文件，在这里进行标注
    └── coco        # coco 数据集，用于训练
        ├── images
        │   ├── train2017
        │   └── val2017
        └── labels   
            ├── train2017
            └── val2017
```

**4.修改数据集类别个数与名称与保存路径:**在文件路径`YOLOv5-Lite_DIR/data/cocol.yaml`中，将`names`修改为自己数据集所要识别的名称，将`nc`修改为自己数据集所要识别的类别个数,将`train`,`val`,`test`修改为数据集对应位置

![image-20220311185943426](./imaegs/image-1.png)

**5.训练数据集**

在`/YOLOv5-Lite`下执行以下命令：

```
$ python train.py --data coco.yaml --cfg v5lite-s.yaml --weights v5lite-s.pt --batch-size 128
                                         v5lite-c.yaml           v5lite-c.pt               96
                                         v5lite-g.yaml           v5lite-g.pt               64
```

训练所得结果保存在`YOLOv5-Lite/runs/train/exp`中

### 训练权重转换

模型训练完成后需要将`.pt`文件转换为OpenVINO所需要的`.xml`与`.bin`文件，转化流程如下所示：

```
  .pt-> .onnx  # 通过执行文件 /models/export.py
            └─> .onnx -> .xml/.bin  #通过执行文件：/opt/intel/openvino_DIR/deployment_tools/model_optimizer/mo_onnx.py
```

**1.pth2onnx**

```
python3 models/export.py --weights weights/v5lite-c.pt --img 640 --batch 1
```

**2.onnx2xml**

```
python3 /opt/intel/openvino_2021/deployment_tools/model_optimizer/mo_onnx.py --input_model best.onnx -s 255 --data_type FP16  --reverse_input_channels --output Conv_454,Conv_457,Conv_460  ##输出应通过netorn等软件选取
```

### 验证模型

`YOLOv5-Lite/demo/OpenVINO`中有c++和python两套使用OpenVINO部署YOLOX的代码，执行相应指令验证训练结果(以python为例)

```
cd ~/YOLOv5-Lite/python_demo/openvino
python3 openvino.py -m best.xml -i bike.jpg
```

