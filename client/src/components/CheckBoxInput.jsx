const CheckBoxInput = ({
    label,
    name,
    isChecked,
    setCheck
}) => {
  return (
    <label className="flex items-center gap-4 containerCheckBox">
    {label}
    <input name={name} type={"checkbox"} className=" w-12 py-5 px-3 flex" />
    
    <span className="checkmark"></span>
</label>
  )
}

export default CheckBoxInput
