import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import {Field, Form, Formik, useFormik} from 'formik';
import styles from "./addUseful.module.scss";
import * as Api from "@/shared/api/Api";
import Select from "react-select";
import {ClosePopup} from "@/components/EventsPage/img/closePopup";
import CloseIcon from "@/assets/closeIcon.png";


interface CardData {
  preview_image: string;
  title: string;
  description: string;
  category: [];
  url: string;
  text: string;
}

interface FormValues {
  preview_image: File | null;
}

const CustomStyles = {
  input: (provided: any) => ({
    ...provided,
    height: '28px',
    width: '28px',
    borderRadius: '12px',
    color: 'red',
  }),
  control: (provided: any) => ({
    ...provided,
    borderRadius: '14px',
    borderColor: 'var(--color-accent-secondary)',
  }),
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      textAlign: 'center',
      fontSize: '20px',
      color: 'var(--color-accent-secondary)',
    }
  },
  menu: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      width: '400px',
    }
  },
}

interface AddCardProps {
  onClose: () => void;
}

const initialValues: CardData = {
  preview_image: '',
  title: '',
  description: '',
  category: [],
  url: '',
  text: '',
};

interface OptionType {
  value: string;
  label: string;
}

const options: OptionType[] = [
  {value: 'article', label: 'Статья'},
  {value: 'video', label: 'Видео'},
  {value: 'news', label: 'Новости'}
];

const addCard = async (values: {}) => {


  try {
    await Api.addUseful(values)
      .then(() => {

          return;
        }
      )
      .then(() => {

        }
      )
  } catch (err: any) {

    console.log(err);
  }
}


const AddUseful: React.FC<AddCardProps> = ({onClose}: any) => {
  // const [allOptions, setAllOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>();
  const [picture, setPicture] = useState<string | null>(null);
  // const [isLinkActive, setIsLinkActive] = useState(false);
  // const [isTextActive, setIsTextActive] = useState(false);

  // const handleLinkChange = (event: any) => {
  //   setIsLinkActive(event.target.value.trim().length > 0);
  // };
  //
  // const handleTextChange = (event: any) => {
  //   setIsTextActive(event.target.value.trim().length > 0);
  // };

  // useEffect(() => {
  //   setAllOptions(options)
  // }, [selectedOptions])


  const handleSubmit = (values: CardData, {setSubmitting}: any) => {

    console.log(values);
    addCard(values);
    setSubmitting(false);
    onClose();
  };


  const formik = useFormik<FormValues>({
    initialValues: {
      preview_image: null,
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      formik.setFieldValue("preview_image", event.currentTarget.files[0]);
      setPicture(event.currentTarget.files[0].name);
      console.log(event.currentTarget.files[0]);
    }

  };

  return (
    <div className={styles.container}>
      <h3 className={styles.add_article}>Добавить публикацию материала
        <button className={styles.close} onClick={onClose}><ClosePopup/></button>
      </h3>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({isSubmitting}) => (
          <Form>
            <div className={styles.input_container}>
              <label className={styles.subtitle}>Обложка</label>
              <div className={styles.upload_container}>
                <label htmlFor="preview_image"
                       className={styles.preview_image}>+</label>
                <Field id="preview_image" type="file" name="preview_image"
                       onChange={handleFileChange}
                       accept="image/*"
                       style={{display: "none"}}/>
                {
                  picture ? <div className={styles.upload}>{picture}
                      <button className={styles.delete_picture}
                              onClick={() => setPicture(null)}><img src={CloseIcon} alt="CloseIcon"/></button>
                    </div>
                    : null
                }


                {/*<span className={styles.upload}>{*/}
                {/*  picture ? picture && <button onClick={() => setPicture(null)} */}
                {/*  : null>X</button>}</span>*/}
              </div>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="title" className={styles.subtitle}>Название</label>
              <Field type="text" placeholder="Введите название" name="title" className={styles.title}/>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="description" className={styles.subtitle}>Описание</label>
              <Field as="textarea" placeholder="Введите описание" name="description" className={styles.description}/>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="category" className={styles.subtitle} style={{marginBottom: 0}}>Выберете теги</label>
              <div className={styles.select_container}>
                <Select
                  className={styles.select}
                  name="category"
                  options={options}
                  isMulti={true}
                  placeholder={'+'}
                  isClearable={false}
                  components={{DropdownIndicator: () => null, IndicatorSeparator: () => null}}
                  styles={CustomStyles}
                  controlShouldRenderValue={false}
                  onChange={(options) => setSelectedOptions(options as OptionType[])}
                />
                <div className={styles.choosen_container}>
                  {selectedOptions && selectedOptions.map(option => (
                    <div className={styles.choosen} key={option.value}>{option.label}
                      <button className={styles.delete}
                              onClick={(event) => {
                                setSelectedOptions(selectedOptions.filter(item => item.value !== option.value))
                                event.stopPropagation();
                                // setAllOptions(options)
                                // console.log(selectedOptions)
                              }
                              }>x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="url" className={styles.subtitle} style={{marginBottom: 8}}>Ссылка</label>
              <Field type="text" placeholder="Вставьте ссылку на ресурс" name="url" className={styles.url}
                // onChange={handleLinkChange}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="text" className={styles.subtitle} style={{marginBottom: 8}}>Содержание</label>
              <Field as="textarea" placeholder="Введите текст" name="text" className={styles.text}
                // onChange={handleTextChange}
              />
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.cancel} disabled={isSubmitting}>
                Отмена
              </button>
              <button type="submit" className={styles.submit}
                // disabled={!isLinkActive && !isTextActive}
              >
                Добавить
              </button>
            </div>


          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUseful;
